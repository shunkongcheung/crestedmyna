from general.gnl_lookup.utils import get_lookup_value
import quandl


def get_stock_api_key():
    return get_lookup_value('STOCK_API_KEY')


def get_quandl():
    quandl.ApiConfig.api_key = get_stock_api_key()
    return quandl
