def get_lookups():
    ''' 
    name:           char (128) 
    catagory:       char (128) 
    lookup_value:   text 
    is_public :     boolean optional
    '''
    return [
        {
            'name': 'STOCK_API_KEY',
            'catagory': 'STOCK',
            'lookup_value': 'Wsy-3nr4y7M7356JWx61',
        },
        {
            'name': 'HOST_NAME',
            'catagory': 'GENERAL',
            'lookup_value': 'http://localhost:7000',
        },
    ]
