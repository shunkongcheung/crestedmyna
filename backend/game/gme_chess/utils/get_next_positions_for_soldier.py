from .get_is_piece_friendly import get_is_piece_friendly
from .get_is_position_in_bound import get_is_position_in_bound


def get_next_positions_for_soldier(board, piece_position):
    return get_soldier_march_positions(board, piece_position) + \
        get_soldier_side_positions(board, piece_position)


def get_is_solider_target_steppable(board, cur_piece, target_pos):
    if not get_is_position_in_bound(target_pos):
        return False

    target_piece = board[target_pos[0]][target_pos[1]]
    return not get_is_piece_friendly(cur_piece, target_piece)


def get_soldier_march_positions(board, piece_pos):
    cur_piece = board[piece_pos[0]][piece_pos[1]]
    march_step = 1 if cur_piece.isupper()else -1
    march_pos = (piece_pos[0] + march_step, piece_pos[1],)

    if not get_is_solider_target_steppable(board, cur_piece, march_pos):
        return []

    return [march_pos]


def get_soldier_side_positions(board, piece_pos):
    cur_piece = board[piece_pos[0]][piece_pos[1]]
    is_sideable = False

    if cur_piece.isupper() and piece_pos[0] > 4:
        is_sideable = True

    if not cur_piece.isupper() and piece_pos[0] < 5:
        is_sideable = True

    if not is_sideable:
        return []

    left_pos = (piece_pos[0], piece_pos[1] - 1)
    right_pos = (piece_pos[0], piece_pos[1] + 1)
    side_positions = []

    if get_is_solider_target_steppable(board, cur_piece, left_pos):
        side_positions.append(left_pos)

    if get_is_solider_target_steppable(board, cur_piece, right_pos):
        side_positions.append(right_pos)

    return side_positions
