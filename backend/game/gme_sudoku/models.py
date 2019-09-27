from base.models import MyBaseModel
from django.db import models

# Create your models here.

BOARD_SIZE = pow(9, 2)
DEFAULT_BOARD = ''.join(['_' for _ in range(BOARD_SIZE)])


class SudokuGameRecordMaster(MyBaseModel):
    start_board = models.CharField(max_length=BOARD_SIZE,
                                   default=DEFAULT_BOARD)
    solution_board = models.CharField(max_length=BOARD_SIZE,
                                      default=DEFAULT_BOARD)
    current_board = models.CharField(max_length=BOARD_SIZE,
                                     default=DEFAULT_BOARD)
    used_second = models.IntegerField(default=0)
    difficulty = models.CharField(
        max_length=16,
        default='easy',
        choices=[
            ('easy', 'Easy'),
            ('medium', 'Medium'),
            ('difficult', 'Difficult'),
        ]
    )
