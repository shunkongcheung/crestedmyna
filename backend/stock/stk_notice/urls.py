from django.conf.urls import url
from .apis import (
    StockNoticeShareholderListAPIView,
)

app_name = 'stk_notice'

urlpatterns = [
    url(r'^(?P<stock_code>[0-9]+)/$',
        StockNoticeShareholderListAPIView.as_view(),
        name='app_name_val-api-list'
        ),
]
