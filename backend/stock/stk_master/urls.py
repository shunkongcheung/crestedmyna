from django.conf.urls import url
from .apis import (
    StockMasterCreateAPIView,
    StockMasterListAPIView,
    StockMasterObjectAPIView,
    StockUpdateStockMasterMarketPriceAndValueAPIView,
)

app_name = 'stk_master'

urlpatterns = [
    url(r'^create/$',
        StockMasterCreateAPIView.as_view(),
        name='stk_master-api-create'
        ),
    url(r'^list/$',
        StockMasterListAPIView.as_view(),
        name='stk_master-api-list'
        ),
    url(r'^update_stock_master_market_price_and_value/$',
        StockUpdateStockMasterMarketPriceAndValueAPIView.as_view(),
        name='stk_master-api-update_stock_master_market_price_and_value'
        ),
    url(r'^(?P<pk>[0-9]+)/$',
        StockMasterObjectAPIView.as_view(),
        name='stk_master-api-object'
        ),
]
