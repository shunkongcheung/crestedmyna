from game.gme_chess.utils import (
    get_initial_board,
    get_next_boards,
    get_hash_from_board,
)


def get_to_board_hashes_from_initial_board():
    initial_board = get_initial_board()
    initial_next_boards = get_next_boards(initial_board, is_upper_side=False)
    initial_next_board_hashes = [
        get_hash_from_board(initial_next_board)
        for initial_next_board in initial_next_boards
    ]
    return initial_next_board_hashes
