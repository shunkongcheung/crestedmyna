from django.conf.urls import url, include

from .stk_alert import urls as stk_alert
from .stk_ccass import urls as stk_ccass
from .stk_master import urls as stk_master
from .stk_trend import urls as stk_trend
from .stk_portfolio import urls as stk_profile
from .stk_sector import urls as stk_sector
from .stk_tx import urls as stk_tx

app_name = 'stock'

urlpatterns = [
    url(r'^stk_alert/', include(stk_alert)),
    url(r'^stk_ccass/', include(stk_ccass)),
    url(r'^stk_master/', include(stk_master)),
    url(r'^stk_trend/', include(stk_trend)),
    url(r'^stk_portfolio/', include(stk_profile)),
    url(r'^stk_sector/', include(stk_sector)),
    url(r'^stk_tx/', include(stk_tx)),
]
