from django.conf.urls import url, include

from .stk_master import urls as stk_master
from .stk_profile import urls as stk_profile
from .stk_tx import urls as stk_tx

app_name = 'stock'

urlpatterns = [
    url(r'^stk_master/', include(stk_master)),
    url(r'^stk_profile/', include(stk_profile)),
    url(r'^stk_tx/', include(stk_tx)),
]
