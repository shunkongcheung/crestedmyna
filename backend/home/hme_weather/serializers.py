from rest_framework.serializers import (
    CharField,
    FloatField,
    IntegerField,
    DateTimeField,
    Serializer,
)
from .utils import get_cur_weather


class WeatherInfoSerializer(Serializer):
    latitude = FloatField(required=False)
    longitude = FloatField(required=False)

    data_time = DateTimeField(read_only=True)
    desc_detail = CharField(read_only=True)
    desc_main = CharField(read_only=True)
    humidity = IntegerField(read_only=True)
    icon_url = CharField(read_only=True)
    location = CharField(read_only=True)
    temp = FloatField(read_only=True)
    temp_min = FloatField(read_only=True)
    temp_max = FloatField(read_only=True)

    def validate(self, data):
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        weather_data = get_cur_weather(latitude, longitude)
        return {**data, **weather_data}