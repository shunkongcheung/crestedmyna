from django.conf.urls import url
from .apis import WeatherInfoAPIView


app_name = 'hme_weather'

urlpatterns = [
    url(r'^info/$',
        WeatherInfoAPIView.as_view(),
        name='hme_weather-api-info'
        ),
]
