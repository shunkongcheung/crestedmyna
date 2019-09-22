from base.apis import (
    MyCreateAPIView,
    MyObjectAPIView,
)

from .serializers import (
    ChessInitialBoardSerializer,
    ChessJudgeWinnerSerializer,
    ChessMakeMoveSerializer,
    ChessValidMovesSerializer,
)

from .models import ChessMoveRequestMaster

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


class ChessMakeMoveAPIView(MyCreateAPIView):
    serializer_class = ChessMakeMoveSerializer

    def get_serializer(self, *args, **kwargs):
        kwargs['user'] = self.request.user
        return super().get_serializer(*args, **kwargs)

    def perform_create(self, data):
        pass


class ChessMoveRequestMasterObjectAPIView(MyObjectAPIView):
    http_method = ['get', ]
    fields = ['from_board',
              'to_board',
              'projected_child_count',
              'calculated_child_count',
              ]
    model = ChessMoveRequestMaster


class ChessValidMovesAPIView(MyCreateAPIView):
    serializer_class = ChessValidMovesSerializer

    def perform_create(self, data):
        pass
