from newsapi import NewsApiClient
from general.gnl_lookup.utils import get_lookup_value


def get_newsapi_key():
    return get_lookup_value('NEWS_API_KEY')


def get_newsapi():
    newsapi = NewsApiClient(api_key=get_newsapi_key())
    return newsapi
