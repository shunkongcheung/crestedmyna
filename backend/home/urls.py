from django.conf.urls import url, include

from .hme_weather.models import *

app_name = 'home'

urlpatterns = [
    url(r'^hme_weather/', include(hme_weather)),
]
