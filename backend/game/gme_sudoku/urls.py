from django.conf.urls import url
from .apis import (
    SudokuInitialBoardSerializerAPIView,
    SudokuGameRecordMasterObjectAPIView,
)

app_name = 'gme_sudoku'

urlpatterns = [
    url(r'^initial_board/$',
        SudokuInitialBoardSerializerAPIView.as_view(),
        name='gme_sudoku-api-initial_board'
        ),
    url(r'^game_record/$',
        SudokuGameRecordMasterObjectAPIView.as_view(),
        name='gme_sudoku-api-object'
        ),
]
