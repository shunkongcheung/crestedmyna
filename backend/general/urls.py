from django.conf.urls import url, include
from .gnl_accesslog import urls as gnl_accesslog
from .gnl_lookup import urls as gnl_lookup
from .gnl_media import urls as gnl_media
from .gnl_syslog import urls as gnl_syslog

app_name = 'general'

urlpatterns = [
    url(r'^gnl_accesslog/', include(gnl_accesslog)),
    url(r'^gnl_lookup/', include(gnl_lookup)),
    url(r'^gnl_media/', include(gnl_media)),
    url(r'^gnl_syslog/', include(gnl_syslog)),
]
