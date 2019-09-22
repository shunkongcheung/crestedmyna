from django.conf.urls import url, include
from .gme_chess import urls as gme_chess

app_name = 'game'

urlpatterns = [
    url(r'^gme_chess/', include(gme_chess)),
]
