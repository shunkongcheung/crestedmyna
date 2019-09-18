from django.conf.urls import url, include

from .hme_weather import urls as hme_weather

app_name = 'home'

urlpatterns = [
    url(r'^hme_weather/', include(hme_weather)),
]
