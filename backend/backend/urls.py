"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
)


urlpatterns = [
    path('api/general/', include('general.urls')),
    path('api/journal/', include('journal.urls')),
    path('api/stock/', include('stock.urls')),
    path('api/uam/', include('uam.urls')),
    # path('api/token/obtain/', obtain_jwt_token),
    # path('api/token/refresh/', refresh_jwt_token),
    path('admin/', admin.site.urls),
    url(r'^', TemplateView.as_view(template_name='index.html')),
]
