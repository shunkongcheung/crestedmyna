from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (
    CharField,
    PrimaryKeyRelatedField,
    Serializer,
)

from game.models import (
    ChessBoardResultMaster,
    ChessMoveRequestMaster,
)
from game.gme_chess.utils import (
    get_board_from_hash,
    get_board_winner_and_score,
    get_next_boards,
)
from game.gme_chess.utils.prefixes import CHS_EMPTY

from general.gnl_lookup.utils import get_lookup_value


def get_result_master_to_board(from_board, user):
    try:
        result_master = ChessBoardResultMaster.objects\
            .get(from_board=from_board)
        return result_master.to_board

    except ChessBoardResultMaster.DoesNotExist:
        return None


def get_request_master(from_board, user):
    calculate_level = int(get_lookup_value('CHESS_CALCULATE_LEVEL'))
    from_board_arr = get_board_from_hash(from_board)
    next_moves_len = len(get_next_boards(from_board_arr))
    projected_child_count = pow(next_moves_len, calculate_level)

    request_master = ChessMoveRequestMaster.objects.create(
        name=from_board,
        from_board=from_board,
        to_board='',
        projected_child_count=projected_child_count,
        created_by=user
    )
    request_master.save()
    return request_master


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
        data['chess_move_request_master'] = get_request_master(
            from_board, self.user)
        return data
