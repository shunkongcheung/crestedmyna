from .get_is_position_in_palace import get_is_position_in_palace
from .get_is_piece_friendly import get_is_piece_friendly


def get_next_positions_for_knight(board, piece_position):
    bottom_left, bottom_right = (1, -1), (1, 1)
    top_left, top_right = (-1, -1), (-1, 1)
    directions = [
        bottom_left, bottom_right,
        top_left, top_right,
    ]

    cur_piece = board[piece_position[0]][piece_position[1]]

    next_moves = []
    for direction in directions:
        next_pos = (
            piece_position[0] + direction[0],
            piece_position[1] + direction[1],
        )
        in_bound = get_is_position_in_palace(cur_piece, next_pos)
        if (in_bound):
            next_piece = board[next_pos[0]][next_pos[1]]
            if not get_is_piece_friendly(cur_piece, next_piece):
                next_moves.append(next_pos)

    return next_moves
