from django.conf.urls import url
from .apis import (
    StockNoticeListAPIView,
    StockNoticeShareholderListAPIView,
)

app_name = 'stk_notice'

urlpatterns = [
    url(
        r'^shareholder/(?P<stock_code>[0-9]+)/$',
        StockNoticeShareholderListAPIView.as_view(),
        name='stk_notice-api-shareholder_list'
    ),
    url(
        r'^(?P<stock_code>[0-9]+)/$',
        StockNoticeListAPIView.as_view(),
        name='stk_notice-api-list'
    ),
]
