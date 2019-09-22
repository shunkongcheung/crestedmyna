from base.models import MyBaseModel
from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.


class ChessMoveRequestMaster(MyBaseModel):
    from_board = models.CharField(max_length=90)
    to_board = models.CharField(max_length=90, blank=True)
    projected_child_count = models.PositiveIntegerField()

    @property
    def total_child_count(self):
        return self.board_calculate_masters.count()

    @property
    def calculated_child_count(self):
        return self.board_calculate_masters\
            .filter(is_calculated=True)\
            .count()


class ChessBoardResultMaster(MyBaseModel):
    from_board = models.CharField(max_length=90)
    to_boards = ArrayField(models.CharField(max_length=90))


class ChessBoardCalculateMaster(MyBaseModel):
    move_request_master = models.ForeignKey(
        ChessMoveRequestMaster,
        on_delete=models.CASCADE,
        related_name='board_calculate_masters',
    )
    parent = models.ForeignKey(
        'self',
        null=True,
        on_delete=models.CASCADE,
        related_name='children',
    )

    level = models.PositiveIntegerField()

    board = models.CharField(max_length=90)
    score = models.IntegerField(default=0)
    is_calculated = models.BooleanField(default=False)
