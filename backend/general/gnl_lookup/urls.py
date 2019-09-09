from django.conf.urls import url
from .apis import (
    LookUpListAPIView,
)

app_name = 'gnl_lookup'

urlpatterns = [
    url(r'^list/$',
        LookUpListAPIView.as_view(),
        name='gnl_lookup-api-list'
        ),
]
