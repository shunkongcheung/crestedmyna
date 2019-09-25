from .generate_calculate_masters_from_board_hashes import generate_calculate_masters_from_board_hashes
from .get_to_board_hashes_from_initial_board import get_to_board_hashes_from_initial_board
from .get_to_board_hashes_from_results import get_to_board_hashes_from_results


def gen_chess_results():
    initial_next_board_hashes = get_to_board_hashes_from_initial_board()
    result_next_board_hashes = get_to_board_hashes_from_results()

    next_board_hashes = initial_next_board_hashes + result_next_board_hashes
    generate_calculate_masters_from_board_hashes(next_board_hashes)
