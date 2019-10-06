from django.conf.urls import url
from .apis import StockProfileObjectAPIView

app_name = 'stk_portfolio'

urlpatterns = [
    url(r'^profile/$',
        StockProfileObjectAPIView.as_view(),
        name='stk_portfolio-api-profile'
        ),
]
