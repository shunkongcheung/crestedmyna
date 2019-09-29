from django.conf.urls import url
from .apis import (
    MediaMasterCreateAPIView,
    MediaMasterObjectAPIView,
    MediaMasterResolveAPIView,
)

app_name = 'gnl_media'

urlpatterns = [
    url(r'^create/$',
        MediaMasterCreateAPIView.as_view(),
        name='gnl_media-api-create'
        ),
    url(r'^(?P<pk>[0-9]+)/$',
        MediaMasterObjectAPIView.as_view(),
        name='gnl_media-api-object'
        ),
    url(r'^resolve/(?P<file_name>.+)$',
        MediaMasterResolveAPIView.as_view(),
        name='gnl_media-api-resolve'
        ),
]
