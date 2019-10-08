from django.conf.urls import url
from .apis import (
    StockPortfolioCountDistributionAPIView,
    StockPortfolioSummaryAPIView,
    StockProfileObjectAPIView,
)

app_name = 'stk_portfolio'

urlpatterns = [
    url(r'^count_distribution/$',
        StockPortfolioCountDistributionAPIView.as_view(),
        name='stk_portfolio-api-count_distribution'
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
