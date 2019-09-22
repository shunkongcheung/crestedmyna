from .get_connected_empty_positions import get_connected_empty_positions
from .get_is_piece_opponent import get_is_piece_opponent
from .get_is_position_in_bound import get_is_position_in_bound


def get_next_positions_for_castle(board, piece_position):
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

        # if tip is an opponent.
        if get_is_position_in_bound(tip):
            tip_piece = board[tip[0]][tip[1]]
            if get_is_piece_opponent(cur_piece, tip_piece):
                next_moves.append(tip)

    return next_moves
