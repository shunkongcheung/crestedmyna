from django.conf.urls import url, include

from .stk_master import urls as stk_master

app_name = 'stock'

urlpatterns = [
    url(r'^stk_master/', include(stk_master)),
]
