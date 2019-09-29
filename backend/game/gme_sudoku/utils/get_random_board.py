from base.utils import get_admin_user
from django.utils import timezone
from general.gnl_syslog.utils import write_syslog
from math import floor

from .generate_board import GenerateBoard


def w_debug(message):
    admin_user = get_admin_user()
    return write_syslog('get_random_board', message, admin_user, is_print=True)


def get_row_col_from_index(index):
    row_idx, col_idx = floor(index / 9), index % 9
    return row_idx, col_idx


def get_random_board():
    index, MAX_INDEX = 0, 9*9
    generate_board = GenerateBoard()
    start_time, MAX_SECONDS = timezone.now(), 5

    while index < MAX_INDEX:
        # get current row and column index
        row_idx, col_idx = get_row_col_from_index(index)

        # if all number has been tried at current position
        # reset current position, go back an index
        if generate_board.get_is_tried_full(row_idx, col_idx):
            generate_board.reset_board_at_position(row_idx, col_idx)
            if index > 0:
                index = index - 1
            continue

        # try a number
        generate_board.set_number_at_position(row_idx, col_idx)

        # check if board is valid. if valid, go to next number
        is_valid = generate_board.get_is_board_valid()
        if is_valid:
            index = index + 1
            continue

        # if running too long. restart again
        run_seconds = (timezone.now() - start_time).seconds
        if run_seconds > MAX_SECONDS:
            return get_random_board()

    return generate_board.get_sudoku_board()
