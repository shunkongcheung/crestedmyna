from base.utils import get_admin_user
from django.core.management.base import BaseCommand, CommandError
from general.gnl_syslog.utils import write_syslog
from general.gnl_lookup.utils import get_lookup_value

from game.gme_chess.utils import (
    get_board_from_hash,
    get_initial_board,
    get_hash_from_board,
    get_next_boards,
)
import requests


def generator():
    initial_board = get_initial_board()
    next_boards = get_next_boards(initial_board)
    next_board_hashes = [
        get_hash_from_board(next_board)
        for next_board in next_boards
    ]

    total = len(next_board_hashes)
    write_debug(f'total: {total}')

    for idx, next_board_hash in enumerate(next_board_hashes):
        exist, request_id = request_for_board(next_board_hash)
        if exist:
            write_debug(f'{idx}/{total} existed: {next_board_hash}')
        else:
            write_debug(f'{idx}/{total} {request_id}: {next_board_hash}')
            break


def request_for_board(board_hash):
    host_name = get_lookup_value('HOST_NAME')
    url = f'{host_name}/api/game/gme_chess/make_move/'

    jwt_token = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjAwNzA2NzUxLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTY5MTcwNzUxLCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIn0.HRWRXdQ7d4rh8M1G6Psnaxul3OJL3P4jBmDLtV28f4M'
    if host_name.startswith('https:'):
        jwt_token = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InNodW4uY2hldW5nIiwiZXhwIjoxNjAwNDE1NzI0LCJlbWFpbCI6InNodW5rb25nY2hldW5nQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTY4ODc5NzI0LCJmaXJzdF9uYW1lIjoic2h1biBrb25nIiwibGFzdF9uYW1lIjoiY2hldW5nIn0.8wQfUOSGg3edfpTQKfHXo9by_QJwIGgfHWYsqwG_XXQ'

    data = {'from_board': board_hash}
    headers = {'Authorization': jwt_token, 'Content-Type': 'application/json'}

    response = requests.post(url=url, headers=headers, json=data)
    payload = response.json()
    if response.status_code < 200 or response.status_code >= 300:
        raise Exception(payload)

    if payload.get('to_board'):
        return True, 'already exist'

    return False, payload['chess_move_request_master']


def write_debug(message):
    name, user = 'chess_generator', get_admin_user()
    return write_syslog(name, message, user, is_print=True)


class Command(BaseCommand):
    help = 'generate chess data'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        generator()