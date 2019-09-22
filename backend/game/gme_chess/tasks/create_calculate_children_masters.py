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
                                      is_debug=False
                                      ):
    calculate_master = ChessBoardCalculateMaster.objects.get(
        id=board_calculate_master_id
    )

    def w_debug(message, is_error=False):
        if not is_debug and not is_error:
            return
        name = 'create_calculate_children_masters'
        level, user = calculate_master.level, calculate_master.created_by
        message = f'{calculate_master.id}({level}): {message}. [{calculate_master.board}]'
        level = SystemLog.LVL_ERROR[0]if is_error else SystemLog.LVL_DEBUG[0]
        return write_syslog(name, message, user, level)

    def return_method():
        if not is_backward:
            return

        if not calculate_master.parent:
            w_debug('i am level 0 but i dont have a parent')
            return

        return update_calculate_master_with_best_score.apply_async((
            calculate_master.parent.id,
            is_debug,
        ))

    board = get_board_from_hash(calculate_master.board)
    winner, score = get_board_winner_and_score(board)
    cur_level = calculate_master.level

    # get winner. if exist return score
    if winner != CHS_EMPTY or cur_level == 0:
        calculate_master.score = score
        calculate_master.is_calculated = True
        calculate_master.save()
        w_debug(f'early finish. {winner} {cur_level} {score}')

        return return_method()

    w_debug(f'get next boards. {cur_level}')

    # get all possible move of current board
    next_board_hashes = [
        get_hash_from_board(get_flipped_board(board))
        for board in get_next_boards(board)
    ]
    w_debug(f'next boards count: {len(next_board_hashes)}')

    # store to database
    next_level = cur_level - 1
    calculate_masters = ChessBoardCalculateMaster.objects.bulk_create([
        ChessBoardCalculateMaster(
            name=next_board_hash,
            board=next_board_hash,
            move_request_master=calculate_master.move_request_master,
            parent=calculate_master,
            level=next_level,
            created_by=calculate_master.created_by
        )
        for next_board_hash in next_board_hashes
    ])

    # trigger next level calculation
    _async_results = [
        create_calculate_children_masters.apply_async((
            calculate_master.id,
            is_backward,
            is_debug,
        ))for calculate_master in calculate_masters
    ]
    w_debug('exit')
