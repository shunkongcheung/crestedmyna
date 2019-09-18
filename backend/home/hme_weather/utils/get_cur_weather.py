from datetime import datetime
from django.utils.timezone import make_aware

from general.gnl_lookup.utils import get_lookup_value

import requests


def get_celcius_from_kelvin(kelvin):
    return kelvin - 273


def get_cur_weather(latitude=None, longitude=None):
    # latitude = 22.4271604
    # longitude = 114.2110166
    if (not latitude or not longitude):
        return get_cur_weather_in_hong_kong()
    return get_cur_weather_by_coord(latitude, longitude)


def get_cur_weather_by_coord(latitude, longitude):
    params = {'lat': latitude, 'lon': longitude, }
    payload = get_weather_payload(params)
    return get_data_from_payload(payload)


def get_cur_weather_in_hong_kong():
    params = {'q': 'Hong Kong,HK', }
    payload = get_weather_payload(params)
    return get_data_from_payload(payload)


def get_data_from_payload(payload):
    icon = payload['weather'][0]['icon']
    icon_url = f'https://openweathermap.org/img/wn/{icon}@2x.png'
    temp = get_celcius_from_kelvin(payload['main']['temp'])
    temp_max = get_celcius_from_kelvin(payload['main']['temp_max'])
    temp_min = get_celcius_from_kelvin(payload['main']['temp_min'])
    date_time = make_aware(datetime.fromtimestamp(payload['dt']))
    data = {
        'data_time': date_time,
        'desc_main': payload['weather'][0]['main'],
        'desc_detail': payload['weather'][0]['description'],
        'humidity': payload['main']['humidity'],
        'icon_url': icon_url,
        'location': payload['name'],
        # 'rain_1h': payload['rain']['1h'],
        # 'rain_3h': payload['rain']['3h'],
        'temp': temp,
        'temp_max': temp_max,
        'temp_min': temp_min,
    }
    return data


def get_weather_payload(params):
    url = 'https://api.openweathermap.org/data/2.5/weather'

    weather_api_key = get_lookup_value('WEATHER_API_KEY')
    params['appid'] = weather_api_key

    response = requests.get(url, params=params)

    payload, status_code = response.json(), response.status_code
    if status_code < 200 or status_code >= 300:
        raise Exception(payload['message'])
    return payload
