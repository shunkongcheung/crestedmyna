from base.utils import get_admin_user

from datetime import datetime

from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError

from general.gnl_syslog.utils import write_syslog
from general.gnl_lookup.utils import get_lookup_value

from game.gme_chess.utils import (
    get_board_from_hash,
    get_board_winner_and_score,
    get_initial_board,
    get_hash_from_board,
    get_next_boards,
)
from game.gme_chess.utils.prefixes import CHS_EMPTY

from game.gme_chess.serializers.chess_make_move_serializer import (
    create_calculate_master,
    get_move_request_master,
)
from game.gme_chess.tasks import create_calculate_children_masters
from game.models import (
    ChessBoardCalculateMaster,
    ChessBoardResultMaster,
)


def generator():
    initial_next_board_hashes = get_to_board_hashes_from_initial_board()
    result_next_board_hashes = get_to_board_hashes_from_results()

    next_board_hashes = initial_next_board_hashes + result_next_board_hashes
    generate_calculate_masters_from_board_hashes(next_board_hashes)
    create_dump_file()


def create_dump_file():
    now_time_str = datetime.now().strftime('%Y-%m-%d_%H_%M')
    with open(f'chess_board_result_master_{now_time_str}.json', 'w') as f:
        call_command('dumpdata', 'game.ChessBoardResultMaster', stdout=f)


def get_to_board_hashes_from_initial_board():
    initial_board = get_initial_board()
    initial_next_boards = get_next_boards(initial_board, is_upper_side=False)
    initial_next_board_hashes = [
        get_hash_from_board(initial_next_board)
        for initial_next_board in initial_next_boards
    ]
    return initial_next_board_hashes


def get_to_board_hashes_from_results():
    board_hashes = []
    result_masters = ChessBoardResultMaster.objects.all()
    for result_master in result_masters:
        board_hashes += result_master.to_boards

    return board_hashes


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


def get_created_calculate_master(board_hash, top_level):
    exist_result_master = ChessBoardResultMaster.objects\
        .filter(from_board=board_hash, enable=True)\
        .first()

    if not exist_result_master is None:
        return f'Has result ({exist_result_master.id})', None

    exist_calculate_master = ChessBoardCalculateMaster.objects\
        .filter(board=board_hash, enable=True, level=top_level)\
        .first()

    if not exist_calculate_master is None:
        return f'Has calculate ({exist_calculate_master.id})', None

    move_request_master = get_move_request_master(board_hash, get_admin_user())
    calculate_master = create_calculate_master(move_request_master)
    create_msg = f'Created ({calculate_master.id})'
    return create_msg, calculate_master


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


class Command(BaseCommand):
    help = 'generate chess data'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        generator()
