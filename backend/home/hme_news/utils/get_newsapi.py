from newsapi import NewsApiClient

from backend.credentials import NEWS_KEY
from general.gnl_lookup.utils import get_lookup_value


def get_newsapi_key():
    return NEWS_KEY


def get_newsapi():
    newsapi = NewsApiClient(api_key=get_newsapi_key())
    return newsapi
