from .get_is_position_empty import get_is_position_empty
from .get_is_position_in_bound import get_is_position_in_bound
from .get_is_position_steppable import get_is_position_steppable


def get_next_positions_for_jumbo(board, piece_position):
    general_directions = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
    next_positions = []
    for general_direction in general_directions:
        next_positions += get_jumbo_next_positions_on_direction(
            board, general_direction, piece_position
        )
    return next_positions


def get_jumbo_next_positions_on_direction(board, dir, pos):
    if(not get_is_position_empty(board, dir, pos)):
        return []

    target = (pos[0] + (dir[0] * 2), pos[1] + (dir[1]*2))
    cur_piece = board[pos[0]][pos[1]]

    if(not get_is_jumbo_target_in_bound(target, cur_piece.isupper())):
        return []

    if not get_is_position_steppable(board, cur_piece, target):
        return []

    return [target]


def get_is_jumbo_target_in_bound(target, is_upper_side):
    top = 0 if is_upper_side else 5
    return get_is_position_in_bound(target, top=top, height=5)
