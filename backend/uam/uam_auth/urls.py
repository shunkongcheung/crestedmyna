from django.conf.urls import url
from .apis import (
    AuthLoginAPIView,
    AuthRefreshAPIView,
    AuthRegisterAPIView,
)

app_name = 'uam_auth'

urlpatterns = [
    url(r'^login/$',
        AuthLoginAPIView.as_view(),
        name='uam_auth-api-login'
        ),
    url(r'^refresh/$',
        AuthRefreshAPIView.as_view(),
        name='uam_auth-api-refresh'
        ),
    url(r'^register/$',
        AuthRegisterAPIView.as_view(),
        name='uam_auth-api-register'
        ),
]
