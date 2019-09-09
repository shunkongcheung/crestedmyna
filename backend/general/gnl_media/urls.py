from django.conf.urls import url
from .apis import (
    MediaMasterCreateAPIView,
)

app_name = 'gnl_media'

urlpatterns = [
    url(r'^create/$',
        MediaMasterCreateAPIView.as_view(),
        name='gnl_media-api-create'
        ),
]
