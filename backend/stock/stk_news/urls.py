from django.conf.urls import url
from .apis import StockNewsListAPIView


app_name = 'stk_news'

urlpatterns = [
    url(r'^(?P<stock_code>[0-9]+)/$',
        StockNewsListAPIView.as_view(),
        name='stk_news-api-list'
        ),
]
