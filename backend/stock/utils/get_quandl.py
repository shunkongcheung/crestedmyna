import quandl

from backend.credentials import STOCK_KEY
from general.gnl_lookup.utils import get_lookup_value


def get_stock_api_key():
    return STOCK_KEY


def get_quandl():
    quandl.ApiConfig.api_key = get_stock_api_key()
    return quandl
