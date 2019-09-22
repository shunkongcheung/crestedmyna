from .prefixes import CHS_EMPTY


def get_flipped_board(board):
    flipped_board = [
        [get_flipped_piece(piece) for piece in row]
        for row in reversed(board)
    ]
    return flipped_board


def get_flipped_piece(piece):
    if piece == CHS_EMPTY:
        return piece
    elif piece.isupper():
        return piece.lower()
    else:
        return piece.upper()
