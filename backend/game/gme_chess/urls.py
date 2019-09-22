from django.conf.urls import url
from .apis import (
    ChessInitialBoardAPIView,
    ChessJudgeWinnerAPIView,
    ChessValidMovesAPIView,
)

app_name = 'gme_chess'

urlpatterns = [
    url(r'^initial_board/$',
        ChessInitialBoardAPIView.as_view(),
        name='gme_chess-api-initial_board'
        ),
    url(r'^judget_winner/$',
        ChessJudgeWinnerAPIView.as_view(),
        name='gme_chess-api-judget_winner'
        ),
    url(r'^valid_moves/$',
        ChessValidMovesAPIView.as_view(),
        name='gme_chess-api-valid_moves'
        ),
]