from django.conf.urls import url
from .apis import StockPortfolioObjectAPIView

app_name = 'stk_portfolio'

urlpatterns = [
    url(r'^profile/$',
        StockPortfolioObjectAPIView.as_view(),
        name='stk_portfolio-api-profile'
        ),
]
