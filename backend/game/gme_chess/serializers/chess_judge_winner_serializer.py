from rest_framework.serializers import (
    CharField,
    Serializer,
)

from game.gme_chess.utils import (
    get_board_from_hash,
    get_board_winner_and_score,
)


class ChessJudgeWinnerSerializer(Serializer):
    board = CharField()
    winner = CharField(read_only=True)

    def validate(self, data):
        board = get_board_from_hash(data['board'])
        winner, score = get_board_winner_and_score(board)
        data['winner'] = winner
        return data
