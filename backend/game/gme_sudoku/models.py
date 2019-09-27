from base.models import MyBaseModel
from django.db import models

# Create your models here.


class SudokuGameRecordMaster(MyBaseModel):
    start_board = models.CharField(max_length=pow(9, 2))
    solution_board = models.CharField(max_length=pow(9, 2))
    current_board = models.CharField(max_length=pow(9, 2))
    used_second = models.IntegerField(default=0)
    difficulty = models.CharField(
        max_length=16,
        choices=[
            ('easy', 'Easy'),
            ('medium', 'Medium'),
            ('difficult', 'Difficult'),
        ]
    )
