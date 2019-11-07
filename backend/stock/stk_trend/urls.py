from django.conf.urls import url
from .apis import (
    StockCCASSAndPriceTrendListAPIView,
    StockCreateOrUpdateCCASSAndPriceSummaryDetailAPIView,
    StockTrendAPIView,
)

app_name = 'stk_trend'

urlpatterns = [
    url(
        r'^(?P<date>[0-9]+)/$',
        StockCCASSAndPriceTrendListAPIView.as_view(),
        name='stk_trend-api-info'
    ),
    url(
        r'^create_or_update_ccass_and_price_summary_detail/$',
        StockCreateOrUpdateCCASSAndPriceSummaryDetailAPIView.as_view(),
        name='stk_trend-api-create_or_update_ccass_and_price_summary_detail'
    ),
    url(
        r'^$',
        StockTrendAPIView.as_view(),
        name='stk_trend-api-info'
    ),
]
