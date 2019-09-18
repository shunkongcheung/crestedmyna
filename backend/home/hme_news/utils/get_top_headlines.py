from datetime import datetime
from django.utils.timezone import make_aware
from .get_newsapi import get_newsapi


def get_top_headline_from_raw(raw_top_headline):
    unaware_time = datetime.strptime(
        raw_top_headline['publishedAt'],
        "%Y-%m-%dT%H:%M:%SZ"
    )
    publish_at = make_aware(unaware_time)
    return {
        'author': raw_top_headline['author'],
        'description': raw_top_headline['description'],
        'publish_at': publish_at,
        'source': raw_top_headline['source']['name'],
        'title': raw_top_headline['title'],
        'thumbnail': raw_top_headline['urlToImage'],
        'url': raw_top_headline['url'],
    }


def get_top_headlines(category=None, country='hk', language='en',  q=None):
    newsapi = get_newsapi()
    country = country or 'hk'
    language = language or 'en'

    raw_top_headlines = newsapi.get_top_headlines(q=q,
                                                  category=category,
                                                  language=language,
                                                  country=country,
                                                  page_size=100)['articles']
    top_headlines = [
        get_top_headline_from_raw(raw_top_headline)
        for raw_top_headline in raw_top_headlines
    ]
    return top_headlines
