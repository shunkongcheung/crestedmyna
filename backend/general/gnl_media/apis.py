from base.apis import MyCreateAPIView, MyObjectAPIView

from .serializers import MediaMasterSerializer
from .models import MediaMaster


class MediaMasterCreateAPIView(MyCreateAPIView):
    fields = ['name', 'media_file', ]
    read_only_fields = ['access_url', 'file_type', ]

    model = MediaMaster
    serializer_class = MediaMasterSerializer


class MediaMasterObjectAPIView(MyObjectAPIView):
    http_methods = ['delete', ]
    model = MediaMaster
    serializer_class = MediaMasterSerializer
