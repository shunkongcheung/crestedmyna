from django.conf.urls import url
from .apis import (
    StockTxCreateAPIView,
    StockTxObjectAPIView,
)

app_name = 'stk_tx'

urlpatterns = [
    url(r'^create/$',
        StockTxCreateAPIView.as_view(),
        name='stk_tx-api-create'
        ),
    url(r'^(?P<pk>[0-9]+)/$',
        StockTxObjectAPIView.as_view(),
        name='stk_tx-api-object'
        ),
]
