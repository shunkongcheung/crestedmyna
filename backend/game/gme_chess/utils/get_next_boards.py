from copy import deepcopy
from .get_is_piece_friendly import get_is_piece_friendly
from .get_next_positions_for_castle import get_next_positions_for_castle
from .get_next_positions_for_cannon import get_next_positions_for_cannon
from .get_next_positions_for_general import get_next_positions_for_general
from .get_next_positions_for_horse import get_next_positions_for_horse
from .get_next_positions_for_jumbo import get_next_positions_for_jumbo
from .get_next_positions_for_knight import get_next_positions_for_knight
from .get_next_positions_for_soldier import get_next_positions_for_soldier
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


def get_next_boards(board, is_upper_side=True):
    '''
    Args: 
        board (arrays): to represent the row and columns of chess board
        is_upper_side (bool): get move for which side

    Return:
        array: array of possible boards
    '''

    # find all friendly positions
    friendly_positions = get_position_with_friendly_pieces(
        board,
        is_upper_side
    )

    next_boards = []
    for friendly_position in friendly_positions:
        # get possible moves
        next_positions = get_piece_next_positions(board, friendly_position)

        # for each moves, append new boards
        next_boards += [
            get_board_from_move(board, friendly_position, next_position)
            for next_position in next_positions
        ]
    return next_boards


def get_board_from_move(original_board, from_position, to_position):
    new_board = deepcopy(original_board)

    # to position is replaced by from position's piece
    new_board[to_position[0]][to_position[1]] = \
        new_board[from_position[0]][from_position[1]]

    # from position becomes empty
    new_board[from_position[0]][from_position[1]] = CHS_EMPTY

    return new_board


def get_position_with_friendly_pieces(board, is_upper_side):
    friendly_positions = []

    my_piece = CHS_GENERAL.upper() if is_upper_side else CHS_GENERAL.lower()
    for row_idx, row in enumerate(board):
        for col_idx, piece_prefix in enumerate(row):
            if (get_is_piece_friendly(my_piece, piece_prefix)):
                friendly_positions.append((row_idx, col_idx))

    return friendly_positions


def get_piece_next_positions(board, piece_position):
    '''
    Args:
        board (arrays): the row and columns of chess board
        piece_position (tuple): as suggested

    Return:
        array: (row, column) tuples from function of respective piece
    '''
    funcs = {
        CHS_CASTLE.upper(): get_next_positions_for_castle,
        CHS_CANNON.upper(): get_next_positions_for_cannon,
        CHS_GENERAL.upper(): get_next_positions_for_general,
        CHS_HORSE.upper(): get_next_positions_for_horse,
        CHS_JUMBO.upper(): get_next_positions_for_jumbo,
        CHS_KNIGHT.upper(): get_next_positions_for_knight,
        CHS_SOLDIER.upper(): get_next_positions_for_soldier,
    }
    piece_prefix = board[piece_position[0]][piece_position[1]].upper()
    piece_func = funcs[piece_prefix]
    return piece_func(board, piece_position)
