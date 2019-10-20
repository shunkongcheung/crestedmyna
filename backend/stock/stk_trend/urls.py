from django.conf.urls import url
from .apis import (
    StockCCASSAndPriceTrendListAPIView,
    StockTrendAPIView,
)

app_name = 'stk_trend'

urlpatterns = [
    url(r'^(?P<date>[0-9]+)/$',
        StockCCASSAndPriceTrendListAPIView.as_view(),
        name='stk_trend-api-info'
        ),
    url(r'^$',
        StockTrendAPIView.as_view(),
        name='stk_trend-api-info'
        ),
]
