from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from general.gnl_lookup.utils import get_lookup_value

from .utils import (
    get_board_from_hash,
    get_initial_board,
    get_hash_from_board,
    get_next_boards,
)
import requests


def request_for_board(board_hash):
    host_name = get_lookup_value('HOST_NAME')
    url = f'{host_name}/api/game/gme_chess/make_move/'
    jwt_token = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjAwNzA2NzUxLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTY5MTcwNzUxLCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIn0.HRWRXdQ7d4rh8M1G6Psnaxul3OJL3P4jBmDLtV28f4M'
    data = {'from_board': board_hash}
    headers = {'Authorization': jwt_token, 'Content-Type': 'application/json'}

    response = requests.post(url=url, headers=headers, json=data)
    payload = response.json()
    return payload['chess_move_request_master']


def generator():
    initial_board = get_initial_board()
    next_boards = get_next_boards(initial_board)
    next_board_hashes = [
        get_hash_from_board(next_board)
        for next_board in next_boards
    ]

    total, admin_user = len(next_board_hashes), get_admin_user()
    write_syslog('chess_generator',
                 'total: {total}',
                 admin_user
                 )
    for idx, next_board_hash in enumerate(next_board_hashes):
        request_id = request_for_board(next_board_hash)
        write_syslog('chess_generator',
                     '{idx}/{total} {request_id}: {next_board_hash}',
                     admin_user
                     )
