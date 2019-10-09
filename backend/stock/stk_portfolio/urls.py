from django.conf.urls import url
from .apis import (
    StockPortfolioDistributionAPIView,
    StockPortfolioSummaryAPIView,
    StockProfileObjectAPIView,
)

app_name = 'stk_portfolio'

urlpatterns = [
    url(r'^distribution/$',
        StockPortfolioDistributionAPIView.as_view(),
        name='stk_portfolio-api-distribution'
        ),
    url(r'^summary/$',
        StockPortfolioSummaryAPIView.as_view(),
        name='stk_portfolio-api-summary'
        ),
    url(r'^profile/$',
        StockProfileObjectAPIView.as_view(),
        name='stk_portfolio-api-profile'
        ),
]
