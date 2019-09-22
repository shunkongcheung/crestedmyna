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

from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
)


class NotFoundView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        raise NotFound()

    def put(self, request, *args, **kwargs):
        raise NotFound()

    def post(self, request, *args, **kwargs):
        raise NotFound()

    def delete(self, request, *args, **kwargs):
        raise NotFound()


urlpatterns = [
    path('api/general/', include('general.urls')),
    path('api/game/', include('game.urls')),
    path('api/home/', include('home.urls')),
    path('api/journal/', include('journal.urls')),
    path('api/stock/', include('stock.urls')),
    path('api/uam/', include('uam.urls')),
    url('api/*', NotFoundView.as_view()),

    path('admin/', admin.site.urls),
    url(r'^', TemplateView.as_view(template_name='index.html')),
]
