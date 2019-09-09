from django.conf.urls import url, include
from .jnl_master import urls as jnl_master

app_name = 'journal'

urlpatterns = [
    url(r'^jnl_master/', include(jnl_master)),
]
