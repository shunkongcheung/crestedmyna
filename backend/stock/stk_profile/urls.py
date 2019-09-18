from django.conf.urls import url
from .apis import StockProfileObjectAPIView

app_name = 'stk_profile'

urlpatterns = [
    url(r'^detail/$',
        StockProfileObjectAPIView.as_view(),
        name='stk_profile-api-object'
        ),
]
