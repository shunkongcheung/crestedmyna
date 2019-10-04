from django.conf.urls import url
from .apis import (
    StockTxCreateAPIView,
    StockTxListAPIView,
    StockMasterTxListAPIView,
    StockTxObjectAPIView,
)

app_name = 'stk_tx'

urlpatterns = [
    url(r'^create/$',
        StockTxCreateAPIView.as_view(),
        name='stk_tx-api-create'
        ),
    url(r'^delete/(?P<pk>[0-9]+)/$',
        StockTxObjectAPIView.as_view(),
        name='stk_tx-api-object'
        ),
    url(r'^list/$',
        StockTxListAPIView.as_view(),
        name='stk_tx-api-list'
        ),
    url(r'^(?P<stock_master>[0-9]+)/$',
        StockMasterTxListAPIView.as_view(),
        name='stk_tx-api-list'
        ),
]
