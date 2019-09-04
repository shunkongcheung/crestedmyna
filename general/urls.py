from django.conf.urls import url, include
from .gnl_syslog import urls as gnl_syslog

app_name = 'general'

urlpatterns = [
    url(r'^gnl_syslog/', include(gnl_syslog)),
]
