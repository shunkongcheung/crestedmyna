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
    ]
