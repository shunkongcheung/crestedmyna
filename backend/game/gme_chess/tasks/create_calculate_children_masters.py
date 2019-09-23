from __future__ import absolute_import, unicode_literals
from celery import shared_task

from game.models import ChessBoardCalculateMaster
from game.gme_chess.utils import (
    get_board_from_hash,
    get_board_winner_and_score,
    get_flipped_board,
    get_hash_from_board,
    get_next_boards,
)
from game.gme_chess.utils.prefixes import CHS_EMPTY

from general.gnl_syslog.utils import write_syslog
from general.models import SystemLog

from .update_calculate_master_with_best_score import (
    update_calculate_master_with_best_score,
)


@shared_task
def create_calculate_children_masters(board_calculate_master_id,
                                      is_backward=True,
                                      is_debug=True
                                      ):
    calculate_master = ChessBoardCalculateMaster.objects\
        .get(id=board_calculate_master_id)

    def w_debug(message, is_error=False):
        if not is_debug and not is_error:
            return

        name, board = 'create_calculate_children_masters', calculate_master.board
        level, user = calculate_master.level, calculate_master.created_by
        message = f'{calculate_master.id}({level}): {message}. [{board}]'
        level = SystemLog.LVL_ERROR[0] if is_error else SystemLog.LVL_DEBUG[0]
        return write_syslog(name, message, user, level)

    def return_method(is_return_self):
        if not is_backward:
            w_debug('not backward')
            return

        if is_return_self:
            calculate_master_id = calculate_master.id
        else:
            if not calculate_master.parent:
                w_debug('i dont have a parent')
                return
            calculate_master_id = calculate_master.parent.id

        return update_calculate_master_with_best_score\
            .apply_async((calculate_master_id, is_debug,))

    board = get_board_from_hash(calculate_master.board)
    cur_level = calculate_master.level

    # get winner. if exist return score
    if calculate_master.is_calculated:
        w_debug(f'early finish. {cur_level}')
        return return_method(False)

    w_debug(f'get next boards. {cur_level}')

    # get all possible move of current board
    next_board_and_hashes = []
    for next_unflipped_board in get_next_boards(board):
        next_board = get_flipped_board(next_unflipped_board)
        next_board_and_hashes\
            .append((next_board, get_hash_from_board(next_board),))

    w_debug(f'next boards count: {len(next_board_and_hashes)}')

    # store to database
    next_level = cur_level - 1
    temp_calculate_masters, is_next_level_calculated = [], next_level == 0
    for (next_board, next_board_hash) in next_board_and_hashes:
        winner, score = get_board_winner_and_score(next_board)
        temp_calculate_masters.append(
            ChessBoardCalculateMaster(
                name=next_board_hash,
                board=next_board_hash,
                move_request_master=calculate_master.move_request_master,
                parent=calculate_master,
                is_calculated=is_next_level_calculated or winner != CHS_EMPTY,
                score=score,
                level=next_level,
                created_by=calculate_master.created_by
            )
        )
    calculate_masters = ChessBoardCalculateMaster.objects\
        .bulk_create(temp_calculate_masters)

    # trigger next level calculation
    if cur_level > 1:
        _async_results = [
            create_calculate_children_masters
            .apply_async((calculate_master.id, is_backward, is_debug,))
            for calculate_master in calculate_masters
        ]
    else:
        return return_method(True)
    w_debug('exit')
