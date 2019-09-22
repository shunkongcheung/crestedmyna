from .prefixes import (
    CHS_EMPTY,
    CHS_CANNON,
    CHS_CASTLE,
    CHS_GENERAL,
    CHS_HORSE,
    CHS_JUMBO,
    CHS_KNIGHT,
    CHS_SOLDIER,
)


def get_board_winner_and_score(board):
    total, winner_score = 0, 10000
    is_tgeneral_exist, is_bgeneral_exist = False, False
    for row in board:
        for piece in row:
            total += get_piece_score(piece)
            if piece == CHS_GENERAL.upper():
                is_tgeneral_exist = True
            if piece == CHS_GENERAL.lower():
                is_bgeneral_exist = True

    if not is_tgeneral_exist:
        return CHS_GENERAL.lower(), -winner_score + total
    if not is_bgeneral_exist:
        return CHS_GENERAL.upper(), winner_score + total

    return CHS_EMPTY, total


def get_piece_score(piece_prefix):
    piece_prefix_upper = piece_prefix.upper()
    piece_score = [
        CHS_EMPTY.upper(),
        CHS_SOLDIER.upper(),
        CHS_JUMBO.upper(),
        CHS_KNIGHT.upper(),
        CHS_CANNON.upper(),
        CHS_HORSE.upper(),
        CHS_CASTLE.upper(),
        CHS_GENERAL.upper(),
    ]
    piece_index = piece_score.index(piece_prefix_upper)
    return piece_index if piece_prefix.isupper() else -piece_index
