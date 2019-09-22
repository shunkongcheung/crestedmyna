from base.apis import (
    MyCreateAPIView,
    MyObjectAPIView,
)

from .serializers import (
    ChessInitialBoardSerializer,
    ChessJudgeWinnerSerializer,
    ChessValidMovesSerializer,
)

from game.gme_chess.utils import (
    get_initial_board,
    get_hash_from_board,
)


class ChessInitialBoardAPIView(MyObjectAPIView):
    serializer_class = ChessInitialBoardSerializer
    http_method = ['get', ]

    def get_object(self):
        return {
            'board': get_hash_from_board(get_initial_board())
        }


class ChessJudgeWinnerAPIView(MyCreateAPIView):
    serializer_class = ChessJudgeWinnerSerializer

    def perform_create(self, data):
        pass


class ChessValidMovesAPIView(MyCreateAPIView):
    serializer_class = ChessValidMovesSerializer

    def perform_create(self, data):
        pass
