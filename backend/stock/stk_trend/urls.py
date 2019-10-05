from django.conf.urls import url
from .apis import StockTrendAPIView

app_name = 'stk_trend'

urlpatterns = [
    url(r'^$',
        StockTrendAPIView.as_view(),
        name='stk_trend-api-info'
        ),
]
