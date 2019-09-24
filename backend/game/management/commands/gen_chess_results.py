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

from game.gme_chess.serializers import ChessMakeMoveSerializer
from game.gme_chess.tasks import create_calculate_children_masters
from game.models import (
    ChessMoveRequestMaster,
    ChessBoardResultMaster,
)

import time


def generator():
    initial_board = get_initial_board()
    next_boards = get_next_boards(initial_board, is_upper_side=False)
    next_board_hashes = [
        get_hash_from_board(next_board)
        for next_board in next_boards
    ]
    generate_from_board_hashes(next_board_hashes, 0)
    create_dump_file()
    idx = 1

    while True:
        next_board_hashes = get_to_board_hashes_of_results()
        generate_from_board_hashes(next_board_hashes, idx)
        create_dump_file()
        idx = idx + 1


def create_dump_file():
    now_time_str = datetime.now().strftime('%Y-%m-%d_%H_%M')
    with open(f'chess_board_result_master_{now_time_str}.json', 'w') as f:
        call_command('dumpdata', 'game.ChessBoardResultMaster', stdout=f)


def get_to_board_hashes_of_results():
    board_hashes = []
    result_masters = ChessBoardResultMaster.objects.all()
    for result_master in result_masters:
        board_hashes += result_master.to_boards

    return board_hashes


def generate_from_board_hashes(board_hashes, round_idx):
    total = len(board_hashes)
    write_debug(f'starting round {round_idx} with {total}')

    for idx, board_hash in enumerate(board_hashes):
        board = get_board_from_hash(board_hash)
        winner, _ = get_board_winner_and_score(board)
        if winner != CHS_EMPTY:
            debug_msg = f'{round_idx:5} [{idx}/{total}] ' +\
                'had a winner {winner} {board_hash}'
            write_debug(debug_msg)
            continue

        exist, move_request_master_id = request_for_board(board_hash)

        debug_msg = f'{round_idx:5} [{idx}/{total}] existed: {board_hash}'
        if not exist:
            debug_msg = f'{round_idx:5} [{idx}/{total}] {move_request_master_id}: {board_hash}'
        write_debug(debug_msg)

        if not exist:
            wait_for_request_to_be_done(move_request_master_id)


def request_for_board(board_hash):
    data = {'from_board': board_hash, }
    serializer = ChessMakeMoveSerializer(data=data, user=get_admin_user())
    serializer.is_valid(raise_exception=True)

    validated_data = serializer.validated_data
    to_board = validated_data.get('to_board')
    if to_board:
        return True, None

    return False, validated_data['chess_move_request_master'].id


def wait_for_request_to_be_done(move_request_master_id):
    while True:
        move_request_master = ChessMoveRequestMaster.objects\
            .get(id=move_request_master_id)
        if move_request_master.to_board:
            return
        write_debug(f'{move_request_master.id} pending...')
        time.sleep(20)

        move_request_master = ChessMoveRequestMaster.objects\
            .get(id=move_request_master_id)

        if move_request_master.total_child_count == 1:
            write_debug(f'{move_request_master.id} trigger again...')
            calculate_master = move_request_master\
                .board_calculate_masters\
                .first()
            create_calculate_children_masters\
                .apply_async((calculate_master.id,))

        if move_request_master.total_child_count == 0:
            write_debug(f'{move_request_master.id} shit ?!...')
            return


def write_debug(message):
    name, user = 'chess_generator', get_admin_user()
    return write_syslog(name, message, user, is_print=True)


class Command(BaseCommand):
    help = 'generate chess data'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        generator()
