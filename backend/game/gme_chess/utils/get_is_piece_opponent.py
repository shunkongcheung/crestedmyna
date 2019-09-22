from .get_is_piece_empty import get_is_piece_empty


def get_is_piece_opponent(cur_piece, next_piece):
    if get_is_piece_empty(next_piece):
        return False
    return cur_piece.isupper() != next_piece.isupper()
