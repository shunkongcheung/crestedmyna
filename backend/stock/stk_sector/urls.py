from django.conf.urls import url
from .apis import (
    StockSectorMasterListAPIView,
)

app_name = 'stk_sector'

urlpatterns = [
    url(r'^list/$',
        StockSectorMasterListAPIView.as_view(),
        name='stk_sector-api-list'
        ),
]
