from django.conf.urls import url
from .apis import StockPriceAPIView

app_name = 'stk_price'

urlpatterns = [
    url(r'^$',
        StockPriceAPIView.as_view(),
        name='stk_price-api-info'
        ),
]
