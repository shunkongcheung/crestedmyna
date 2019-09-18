from django.conf.urls import url
from .apis import (
    StockProfileCreateAPIView,
    StockProfileObjectAPIView,
)

app_name = 'stk_profile'

urlpatterns = [
    url(r'^create/$',
        StockProfileCreateAPIView.as_view(),
        name='stk_profile-api-create'
        ),
    url(r'^detail/$',
        StockProfileObjectAPIView.as_view(),
        name='stk_profile-api-object'
        ),
]
