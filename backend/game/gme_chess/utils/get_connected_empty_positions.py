from .get_is_position_in_bound import get_is_position_in_bound
from .prefixes import CHS_EMPTY


def get_connected_empty_positions(board, cur_position, direction):
    next_position = (
        cur_position[0] + direction[0],
        cur_position[1] + direction[1],
    )
    empty_positions = []

    height = len(board)
    width = len(board[0])if height else 0

    while get_is_position_in_bound(next_position, width=width, height=height):
        if board[next_position[0]][next_position[1]] == CHS_EMPTY:
            empty_positions.append(next_position)
            next_position = (
                next_position[0] + direction[0],
                next_position[1] + direction[1],
            )
        else:
            break
    return empty_positions
