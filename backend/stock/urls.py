from django.conf.urls import url, include

from .stk_master import urls as stk_master
from .stk_tx import urls as stk_tx

app_name = 'stock'

urlpatterns = [
    url(r'^stk_master/', include(stk_master)),
    url(r'^stk_tx/', include(stk_tx)),
]
