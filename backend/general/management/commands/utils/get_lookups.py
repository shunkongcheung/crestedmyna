from django.conf import settings


def get_lookups():
    IS_DEVELOPMENT = settings.IS_DEVELOPMENT
    ''' 
    name:           char (128) 
    catagory:       char (128) 
    lookup_value:   text 
    is_public :     boolean optional
    '''

    if IS_DEVELOPMENT:
        host_name = 'http://localhost:7000'
    else:
        host_name = 'https://www.crestedmyna.com'

    return [
        {
            'name': 'CHESS_CALCULATE_LEVEL',
            'catagory': 'GAME',
            'lookup_value': 3,
        },
        {
            'name': 'HOST_NAME',
            'catagory': 'GENERAL',
            'lookup_value': host_name,
        },
        {
            'name': 'WEATHER_API_KEY',
            'catagory': 'HOME',
            'lookup_value': 'f6036417f61b543f94bb43f2c3de9df6',
        },
        {
            'name': 'NEWS_API_KEY',
            'catagory': 'HOME',
            'lookup_value': 'f26e679d4a184a0aa5e5b2684610e323',
        },
        {
            'name': 'STOCK_API_KEY',
            'catagory': 'STOCK',
            'lookup_value': 'Wsy-3nr4y7M7356JWx61',
        },
        {
            'name': 'GOOGLE_API_KEY',
            'catagory': 'ANY',
            'lookup_value': 'AIzaSyDhjvrMl0y7zIIJPoQKHCrIg47JxyzjhUI',
        },
    ]
