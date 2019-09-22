from .prefixes import (
    CHS_EMPTY,
    CHS_GENERAL,
)


def get_winner(board):
    is_tgeneral_exist, is_bgeneral_exist = False, False
    for row in board:
        for piece in row:
            if piece == CHS_GENERAL.upper():
                is_tgeneral_exist = True
            if piece == CHS_GENERAL.lower():
                is_bgeneral_exist = True

    if not is_tgeneral_exist:
        return CHS_GENERAL.lower()
    if not is_bgeneral_exist:
        return CHS_GENERAL.upper()

    return CHS_EMPTY
