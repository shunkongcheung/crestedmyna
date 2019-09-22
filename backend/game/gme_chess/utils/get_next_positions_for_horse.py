from .get_is_position_empty import get_is_position_empty
from .get_is_position_steppable import get_is_position_steppable


def get_next_positions_for_horse(board, piece_position):
    left, right, top, bottom = (0, -1), (0, 1), (-1, 0), (1, 0)
    general_directions = [left, right, top, bottom]

    next_positions = []
    for general_direction in general_directions:
        next_positions += get_horse_next_positions_on_direction(
            board, general_direction, piece_position
        )

    return next_positions


def get_horse_next_positions_on_direction(board,  dir, pos):
    if(not get_is_position_empty(board, dir, pos)):
        return []

    target_one = (
        pos[0] + (dir[0] * 2 if dir[0] else -1),
        pos[1] + (dir[1]*2 if dir[1] else -1),
    )
    target_two = (
        pos[0] + (dir[0] * 2 if dir[0] else 1),
        pos[1] + (dir[1]*2 if dir[1] else 1),
    )
    cur_piece = board[pos[0]][pos[1]]

    next_positions = []
    if get_is_position_steppable(board, cur_piece, target_one):
        next_positions.append(target_one)

    if get_is_position_steppable(board, cur_piece, target_two):
        next_positions.append(target_two)

    return next_positions


# def get_is_horse_check_position_empty(board, dir, pos):
#     check_pos = (pos[0] + dir[0], pos[1] + dir[1])
#     if not get_is_position_in_bound(check_pos):
#         return False

#     check_piece = board[check_pos[0]][check_pos[1]]
#     return get_is_piece_empty(check_piece)


# def get_is_horse_target_steppable(board, cur_piece, target_pos):
#     if (not get_is_position_in_bound(target_pos)):
#         return False

#     target_piece = board[target_pos[0]][target_pos[1]]
#     return not get_is_piece_friendly(cur_piece, target_piece)
