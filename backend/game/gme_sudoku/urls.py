from django.conf.urls import url
from .apis import (
    SudokuInitialBoardAPIView,
    SudokuGameRecordMasterObjectAPIView,
    SudokuValidateAPIView,
)

app_name = 'gme_sudoku'

urlpatterns = [
    url(r'^initial_board/$',
        SudokuInitialBoardAPIView.as_view(),
        name='gme_sudoku-api-initial_board'
        ),
    url(r'^game_record/$',
        SudokuGameRecordMasterObjectAPIView.as_view(),
        name='gme_sudoku-api-object'
        ),
    url(r'^validate_board/$',
        SudokuValidateAPIView.as_view(),
        name='gme_sudoku-api-validate_board'
        ),
]
