from rest_framework.serializers import (
    CharField,
    ChoiceField,
    Serializer,
)

from game.gme_sudoku.utils import (
    get_random_board,
    get_hash_from_board,
)
from math import floor
from random import randint


def get_random_row_and_column():
    MAX_INDEX = 9*9
    random_index = randint(0, MAX_INDEX - 1)
    row_idx, col_idx = floor(random_index/9), random_index % 9
    return row_idx, col_idx


def get_empty_space_count(level):
    if level == 'easy':
        return randint(40, 50)
    if level == 'medium':
        return randint(45, 50)
    if level == 'difficult':
        return randint(50, 60)


def empty_spaces_in_board(board, space_count):
    while space_count > 0:
        row_idx, col_idx = get_random_row_and_column()
        print(row_idx, col_idx, space_count)
        print(board)
        if board[row_idx][col_idx] != '_':
            board[row_idx][col_idx] = '_'
            space_count -= 1


class SudokuInitialBoardSerializer(Serializer):
    difficulty = ChoiceField(choices=[
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('difficult', 'Difficult'),
    ])

    sudoku_board = CharField(read_only=True)

    def validate(self, data):
        difficulty = data['difficulty']
        random_board = get_random_board()
        empty_space_count = get_empty_space_count(difficulty)
        empty_spaces_in_board(random_board, empty_space_count)
        data['sudoku_board'] = get_hash_from_board(random_board)
        return data
