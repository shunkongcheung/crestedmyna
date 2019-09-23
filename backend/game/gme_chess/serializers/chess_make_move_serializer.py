from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (
    CharField,
    PrimaryKeyRelatedField,
    Serializer,
)

from game.models import (
    ChessBoardCalculateMaster,
    ChessBoardResultMaster,
    ChessMoveRequestMaster,
)
from game.gme_chess.tasks import create_calculate_children_masters
from game.gme_chess.utils import (
    get_board_from_hash,
    get_board_winner_and_score,
    get_next_boards,
)
from game.gme_chess.utils.prefixes import CHS_EMPTY
from general.gnl_lookup.utils import get_lookup_value
from random import randint


def create_calculate_master(move_request_master):
    calculate_level = int(get_lookup_value('CHESS_CALCULATE_LEVEL'))
    calculate_master = ChessBoardCalculateMaster.objects.create(
        name=move_request_master.from_board,
        move_request_master=move_request_master,
        parent=None,
        level=calculate_level,
        is_upper_side=True,
        board=move_request_master.from_board,
        created_by=move_request_master.created_by
    )
    return calculate_master


def get_result_master_to_board(from_board, user):
    result_master = ChessBoardResultMaster.objects\
        .filter(from_board=from_board, enable=True).first()

    if result_master is None:
        return None

    to_boards = result_master.to_boards
    desire_index = randint(0, len(to_boards) - 1)
    return to_boards[desire_index]


def get_move_request_master(from_board, user):
    calculate_level = int(get_lookup_value('CHESS_CALCULATE_LEVEL'))
    from_board_arr = get_board_from_hash(from_board)
    next_moves_len = len(get_next_boards(from_board_arr))
    projected_child_count = pow(next_moves_len, calculate_level)

    move_request_master = ChessMoveRequestMaster.objects.create(
        name=from_board,
        from_board=from_board,
        to_board='',
        projected_child_count=projected_child_count,
        created_by=user
    )
    move_request_master.save()
    return move_request_master


class ChessMakeMoveSerializer(Serializer):
    from_board = CharField()

    to_board = CharField(read_only=True)
    chess_move_request_master = PrimaryKeyRelatedField(read_only=True)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)

    def validate_from_board(self, board_hash):
        board = get_board_from_hash(board_hash)
        winner, _score = get_board_winner_and_score(board)
        if winner != CHS_EMPTY:
            raise ValidationError('there is a winner to the board')
        return board_hash

    def validate(self, data):
        from_board = data['from_board']

        # try to get result in result master
        to_board = get_result_master_to_board(from_board, self.user)
        if to_board:
            data['to_board'] = to_board
            return data

        # create a request
        move_request_master = get_move_request_master(from_board, self.user)
        calculate_master = create_calculate_master(move_request_master)
        create_calculate_children_masters\
            .apply_async((calculate_master.id, ))
        data['chess_move_request_master'] = move_request_master
        return data
