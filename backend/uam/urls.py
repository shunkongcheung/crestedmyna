from django.conf.urls import url, include
from .uam_auth import urls as uam_auth

app_name = 'uam'

urlpatterns = [
    url(r'^uam_auth/', include(uam_auth)),
]
