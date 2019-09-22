from .get_is_position_in_bound import get_is_position_in_bound


def get_is_position_in_palace(cur_piece, next_position):
    left, width, height = 3, 3, 3
    top = 0 if cur_piece.isupper() else 7

    return get_is_position_in_bound(
        next_position, left=left, top=top, width=width, height=height
    )
