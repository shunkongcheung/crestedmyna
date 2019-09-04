from django.conf.urls import url, include
from .gnl_lookup import urls as gnl_lookup
from .gnl_syslog import urls as gnl_syslog

app_name = 'general'

urlpatterns = [
    url(r'^gnl_lookup/', include(gnl_lookup)),
    url(r'^gnl_syslog/', include(gnl_syslog)),
]
