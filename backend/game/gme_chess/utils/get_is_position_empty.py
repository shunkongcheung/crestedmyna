from .get_is_position_in_bound import get_is_position_in_bound
from .get_is_piece_empty import get_is_piece_empty


def get_is_position_empty(board, dir, pos):
    check_pos = (pos[0] + dir[0], pos[1] + dir[1])
    if not get_is_position_in_bound(check_pos):
        return False

    check_piece = board[check_pos[0]][check_pos[1]]
    return get_is_piece_empty(check_piece)
