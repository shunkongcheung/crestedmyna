from .get_is_piece_empty import get_is_piece_empty
from .get_is_piece_friendly import get_is_piece_friendly
from .get_is_position_in_bound import get_is_position_in_bound
from .prefixes import CHS_GENERAL


def get_next_positions_for_general(board, piece_position):
    left, right, top, bottom = (0, -1), (0, 1), (-1, 0), (1, 0)
    directions = [left, right, top, bottom]
    cur_piece = board[piece_position[0]][piece_position[1]]

    next_moves = []
    for direction in directions:
        next_pos = (
            piece_position[0] + direction[0],
            piece_position[1] + direction[1],
        )
        in_bound = get_general_in_bound(cur_piece, next_pos)
        if (in_bound):
            next_piece = board[next_pos[0]][next_pos[1]]
            if not get_is_piece_friendly(cur_piece, next_piece):
                next_moves.append(next_pos)

    return next_moves + get_general_fly_position(board, piece_position)


def get_general_fly_position(board, piece_position):
    cur_piece = board[piece_position[0]][piece_position[1]]
    row_step = 1 if cur_piece.isupper() else -1

    cur_pos = (
        piece_position[0] + row_step,
        piece_position[1]
    )
    while get_is_position_in_bound(cur_pos) and \
            get_is_piece_empty(board[cur_pos[0]][cur_pos[1]]):
        cur_pos = (
            cur_pos[0] + row_step,
            cur_pos[1]
        )

    if not get_is_position_in_bound(cur_pos):
        return []

    if board[cur_pos[0]][cur_pos[1]].upper() != CHS_GENERAL.upper():
        return []

    if board[cur_pos[0]][cur_pos[1]].isupper() == cur_piece.isupper():
        return []

    return [cur_pos]


def get_general_in_bound(cur_piece, next_position):
    left, width, height = 3, 3, 3
    top = 0 if cur_piece.isupper() else 7

    return get_is_position_in_bound(
        next_position, left=left, top=top, width=width, height=height
    )
