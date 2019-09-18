from django.conf.urls import url, include

from .hme_news import urls as hme_news
from .hme_weather import urls as hme_weather

app_name = 'home'

urlpatterns = [
    url(r'^hme_news/', include(hme_news)),
    url(r'^hme_weather/', include(hme_weather)),
]
