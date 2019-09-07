from django.conf.urls import url
from .apis import (
    JournalMasterCreateAPIView,
    JournalMasterListAPIView,
    JournalMasterObjectAPIView,
)

app_name = 'jnl_master'

urlpatterns = [
    url(r'^create/$',
        JournalMasterCreateAPIView.as_view(),
        name='jnl_master-api-create'
        ),
    url(r'^list/$',
        JournalMasterListAPIView.as_view(),
        name='jnl_master-api-list'
        ),
    url(r'^(?P<pk>[0-9]+)/$',
        JournalMasterObjectAPIView.as_view(),
        name='jnl_master-api-object'
        ),
]
