from base.apis import MyCreateAPIView

from .serializers import MediaMasterSerializer
from .models import MediaMaster


class MediaMasterCreateAPIView(MyCreateAPIView):
    fields = ['media_file', ]
    read_only_fields = ['name', 'access_url', 'file_type', ]

    model = MediaMaster
    serializer_class = MediaMasterSerializer
