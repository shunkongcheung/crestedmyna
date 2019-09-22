from .get_connected_empty_positions import get_connected_empty_positions
from .get_is_piece_friendly import get_is_piece_friendly
from .get_is_piece_opponent import get_is_piece_opponent
from .get_is_position_in_bound import get_is_position_in_bound


def get_next_positions_for_cannon(board, piece_position):
    left, right, top, bottom = (0, -1), (0, 1), (-1, 0), (1, 0)
    directions = [left, right, top, bottom]
    cur_piece = board[piece_position[0]][piece_position[1]]

    next_moves = []
    for direction in directions:
        # all empty positions
        empty_positions = get_connected_empty_positions(
            board, piece_position, direction
        )
        next_moves += empty_positions

        # get tip of this direction
        tip = empty_positions[-1] if len(empty_positions) else piece_position
        tip = (tip[0] + direction[0], tip[1] + direction[1])

        # if cannon target opponent.
        next_moves += get_cannon_target(board, cur_piece, direction, tip)

    return next_moves


def get_cannon_target(board, ori_piece, dir, tip):
    cur_pos = (tip[0] + dir[0], tip[1] + dir[1])
    while get_is_position_in_bound(cur_pos):
        cur_piece = board[cur_pos[0]][cur_pos[1]]
        if get_is_piece_friendly(ori_piece, cur_piece):
            break
        if get_is_piece_opponent(ori_piece, cur_piece):
            return [cur_pos]

        cur_pos = (cur_pos[0] + dir[0], cur_pos[1] + dir[1])

    return []
