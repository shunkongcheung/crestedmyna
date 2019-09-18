from base.apis import MyCreateAPIView
from .serializers import WeatherInfoSerializer


class WeatherInfoAPIView(MyCreateAPIView):
    serializer_class = WeatherInfoSerializer

    def perform_create(self, serializer):
        pass
