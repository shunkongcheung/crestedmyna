from copy import deepcopy
from random import randint

from .get_is_board_valid import get_is_board_valid


class GenerateBoard:
    sudoku_board = [
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
        ['', '', '', '', '', '', '', '', '', ],
    ]
    tried_numbers_board = [
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
        [[], [], [], [], [], [], [], [], [], ],
    ]

    def get_is_board_valid(self):
        return get_is_board_valid(self.sudoku_board, ignore_empty=True)

    def set_number_at_position(self, row_idx, col_idx):
        try_number = randint(1, 9)
        is_tried = try_number in self.tried_numbers_board[row_idx][col_idx]
        if not is_tried:
            self.tried_numbers_board[row_idx][col_idx].append(try_number)
            self.sudoku_board[row_idx][col_idx] = try_number
        return is_tried

    def get_is_tried_full(self, row_idx, col_idx):
        return len(self.tried_numbers_board[row_idx][col_idx]) == 9

    def get_sudoku_board(self):
        return deepcopy(self.sudoku_board)

    def reset_board_at_position(self, row_idx, col_idx):
        self.sudoku_board[row_idx][col_idx] = ''
        self.tried_numbers_board[row_idx][col_idx] = []
