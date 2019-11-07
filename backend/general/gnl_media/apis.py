from base.apis import MyCreateAPIView, MyObjectAPIView

from django.contrib.auth.models import User
from django.http.response import HttpResponse
from rest_framework.exceptions import NotAuthenticated
from rest_framework_jwt.settings import api_settings

from .serializers import MediaMasterSerializer
from .models import MediaMaster
from .utils import get_media_file

import os


class MediaMasterCreateAPIView(MyCreateAPIView):
    fields = ['name', 'media_file', ]
    read_only_fields = ['file_name', 'file_type', ]

    model = MediaMaster
    serializer_class = MediaMasterSerializer


class MediaMasterObjectAPIView(MyObjectAPIView):
    http_methods = ['delete', ]
    model = MediaMaster
    serializer_class = MediaMasterSerializer


class MediaMasterResolveAPIView(MyObjectAPIView):
    http_methods = ['get', ]
    permission_classes = []
    model = MediaMaster

    def get(self, request, *args, **kwargs):
        object = self.get_object()
        file_name, file_type = object.file_name, object.file_type

        media_file = get_media_file(object.file_name)
        content_type = f'applicaiton/{file_type}'
        response = HttpResponse(media_file, content_type=content_type)
        return response

    def get_request_user(self):
        auth_token = self.request.query_params.get('auth')
        jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
        if not auth_token:
            raise NotAuthenticated()
        username = jwt_decode_handler(auth_token)['username']
        return User.objects.get(username=username, is_active=True)

    def get_object(self):
        file_name = self.kwargs['file_name']
        user = self.get_request_user()
        return self.model.objects.get(file_name=file_name, enable=True)
