from django.conf.urls import url
from .apis import (
    StockAlertMasterObjectAPIView,
)

app_name = 'stk_alert'

urlpatterns = [
    url(r'^(?P<stock_code>.+)/$',
        StockAlertMasterObjectAPIView.as_view(),
        name='stk_alert-api-object'
        ),
]
