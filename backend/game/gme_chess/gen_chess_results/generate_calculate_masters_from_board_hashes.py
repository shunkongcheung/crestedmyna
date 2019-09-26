from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from general.gnl_lookup.utils import get_lookup_value

from game.models import ChessBoardCalculateMaster
from game.gme_chess.tasks import create_calculate_children_masters

from .get_created_calculate_master import get_created_calculate_master


def generate_calculate_masters_from_board_hashes(board_hashes):
    total, MAX_LIMIT = len(board_hashes), 5
    write_debug(f'starting {total}')
    top_level = get_lookup_value('CHESS_CALCULATE_LEVEL')

    created_count = 0
    for idx, board_hash in enumerate(board_hashes):
        create_msg, calculate_master =\
            get_created_calculate_master(board_hash, top_level)
        write_debug(f'[{idx}/{total}]: {create_msg} {board_hash}')

        if not calculate_master is None:
            perform_calculation(calculate_master)
            created_count += 1

        if created_count >= MAX_LIMIT:
            write_debug(f'[{idx}/{total}]: created{created_count}. exit')
            return

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
