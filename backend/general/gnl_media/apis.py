from base.apis import MyCreateAPIView, MyObjectAPIView

from .serializers import MediaMasterSerializer
from .models import MediaMaster


class MediaMasterCreateAPIView(MyCreateAPIView):
    fields = ['media_file', ]
    read_only_fields = ['name', 'access_url', 'file_type', ]

    model = MediaMaster
    serializer_class = MediaMasterSerializer


class MediaMasterObjectAPIView(MyObjectAPIView):
    http_methods = ['delete', ]
    model = MediaMaster
    serializer_class = MediaMasterSerializer
