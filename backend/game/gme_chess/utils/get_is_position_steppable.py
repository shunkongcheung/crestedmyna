from .get_is_position_in_bound import get_is_position_in_bound
from .get_is_piece_friendly import get_is_piece_friendly


def get_is_position_steppable(board, cur_piece, target_pos):
    if (not get_is_position_in_bound(target_pos)):
        return False

    target_piece = board[target_pos[0]][target_pos[1]]
    return not get_is_piece_friendly(cur_piece, target_piece)
