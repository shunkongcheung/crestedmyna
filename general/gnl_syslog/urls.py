from django.conf.urls import url
from .apis import (
    SystemLogListAPIView,
)

app_name = 'gnl_syslog'

urlpatterns = [
    url(r'^list/$',
        SystemLogListAPIView.as_view(),
        name='gnl_syslog-api-list'
        ),
]
