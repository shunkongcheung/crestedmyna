from rest_framework.serializers import (
    CharField,
    Serializer,
)

from game.gme_chess.utils import (
    get_board_from_hash,
    get_winner,
)


class ChessJudgeWinnerSerializer(Serializer):
    board = CharField()
    winner = CharField(read_only=True)

    def validate(self, data):
        board = get_board_from_hash(data['board'])
        data['winner'] = get_winner(board)
        return data
