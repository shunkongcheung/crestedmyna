from django.conf.urls import url
from .apis import (
    StockProfileObjectAPIView,
    StockPortfolioSummaryAPIView,
)

app_name = 'stk_portfolio'

urlpatterns = [
    url(r'^profile/$',
        StockProfileObjectAPIView.as_view(),
        name='stk_portfolio-api-profile'
        ),
    url(r'^summary/$',
        StockPortfolioSummaryAPIView.as_view(),
        name='stk_portfolio-api-summary'
        ),
]
