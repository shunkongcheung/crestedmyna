from base.models import MyBaseModel
from django.db import models

# Create your models here.


class SudokuGameRecordMaster(MyBaseModel):
    start_board = models.CharField(max_length=pow(9, 2))
    current_board = models.CharField(max_length=pow(9, 2))
    used_second = models.IntegerField(default=0)
    is_finished = models.BooleanField(default=False)
