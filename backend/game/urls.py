from django.conf.urls import url, include
from .gme_chess import urls as gme_chess
from .gme_sudoku import urls as gme_sudoku

app_name = 'game'

urlpatterns = [
    url(r'^gme_chess/', include(gme_chess)),
    url(r'^gme_sudoku/', include(gme_sudoku)),
]
