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
from general.gnl_syslog.utils import write_syslog


class ChessMakeMoveSerializer(Serializer):
    from_board = CharField()

    to_board = CharField(read_only=True)
    chess_move_request_master = PrimaryKeyRelatedField(read_only=True)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)

    def get_result_master_to_board(self, from_board):
        try:
            result_master = ChessBoardResultMaster.objects\
                .get(from_board=from_board)
            write_syslog(
                'ChessMakeMove',
                f'found: {result_master.id} {from_board}',
                self.user
            )
            return result_master.to_board

        except ChessBoardResultMaster.DoesNotExist:
            write_syslog(
                'ChessMakeMove',
                f'not found: {from_board}',
                self.user
            )
            return None

    def get_request_master(self, from_board):
        calculate_level = int(get_lookup_value('CHESS_CALCULATE_LEVEL'))
        from_board_arr = get_board_from_hash(from_board)
        next_moves_len = len(get_next_boards(from_board_arr))
        projected_child_count = pow(next_moves_len, calculate_level)

        request_master = ChessMoveRequestMaster.objects.create(
            name=from_board,
            from_board=from_board,
            to_board='',
            projected_child_count=projected_child_count,
            created_by=self.user
        )
        request_master.save()
        write_syslog(
            'ChessMakeMove',
            f'created request: {request_master.id} {from_board}',
            self.user
        )
        return request_master

    def validate_from_board(self, board_hash):
        board = get_board_from_hash(board_hash)
        winner, _score = get_board_winner_and_score(board)
        if winner != CHS_EMPTY:
            raise ValidationError('there is a winner to the board')
        return board_hash

    def validate(self, data):
        from_board = data['from_board']

        # try to get result in result master
        to_board = self.get_result_master_to_board(from_board)
        if to_board:
            data['to_board'] = to_board
            return data

        # create a request
        data['chess_move_request_master'] = self.get_request_master(from_board)
        return data
