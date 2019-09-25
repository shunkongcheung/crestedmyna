from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from general.gnl_syslog.utils import write_syslog
from general.gnl_lookup.utils import get_lookup_value

from game.gme_chess.tasks import create_calculate_children_masters
from game.gme_chess.utils import (
    get_board_from_hash,
    get_board_winner_and_score,
)
from game.gme_chess.utils.prefixes import CHS_EMPTY

from .get_created_calculate_master import get_created_calculate_master


def generate_calculate_masters_from_board_hashes(board_hashes):
    total = len(board_hashes)
    write_debug(f'starting {total}')
    top_level = get_lookup_value('CHESS_CALCULATE_LEVEL')

    for idx, board_hash in enumerate(board_hashes):
        board = get_board_from_hash(board_hash)
        winner, _ = get_board_winner_and_score(board)
        if winner != CHS_EMPTY:
            write_debug(f'[{idx}/{total}] had a winner {winner} {board_hash}')
            print()
            continue

        create_msg, calculate_master =\
            get_created_calculate_master(board_hash, top_level)
        write_debug(f'[{idx}/{total}]: {create_msg} {board_hash}')

        if not calculate_master is None:
            perform_calculation(calculate_master)

        print()


def perform_calculation(root_calculate_master):
    async_task = create_calculate_children_masters\
        .apply_async((root_calculate_master.id,))
    board_hash = root_calculate_master.board

    write_debug(f'{root_calculate_master.id} created {async_task.id}')

    calculated_count = ChessBoardCalculateMaster.objects\
        .filter(is_calculated=True).count()
    all_count = ChessBoardCalculateMaster.objects\
        .filter(is_calculated=True).count()


def write_debug(message):
    name, user = 'chess_generator', get_admin_user()
    return write_syslog(name, message, user, is_print=True)
