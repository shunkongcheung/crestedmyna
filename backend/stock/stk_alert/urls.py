from django.conf.urls import url
from django.urls import path
from .apis import (
    StockAlertSendAlertEmailsAPIView,
    StockAlertMasterObjectAPIView,
)

app_name = 'stk_alert'

urlpatterns = [
    path(r'^send_alert_emails/$',
         StockAlertSendAlertEmailsAPIView.as_view(),
         name='stk_alert-api-send_alert_emails'
         ),
    url(r'^(?P<stock_code>.+)/$',
        StockAlertMasterObjectAPIView.as_view(),
        name='stk_alert-api-object'
        ),
]
