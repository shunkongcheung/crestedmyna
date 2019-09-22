from base.models import MyBaseModel
from django.db import models

# Create your models here.


class ChessMoveRequestMaster(MyBaseModel):
    from_board = models.CharField(max_length=90)
    to_board = models.CharField(max_length=90, blank=True)
    projected_child_count = models.PositiveIntegerField()

    '''
    related_names:
        board_calculate_masters
    '''


class ChessBoardResultMaster(MyBaseModel):
    from_board = models.CharField(max_length=90)
    to_board = models.CharField(max_length=90)


class ChessBoardCalculateMaster(MyBaseModel):
    board = models.CharField(max_length=90)
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
