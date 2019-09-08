from base.serializers import MyBaseSerializer
from rest_framework.serializers import FileField

from .utils import (
    get_media_file_name,
    get_media_file_type,
    store_media_file,
)


class MediaMasterSerializer(MyBaseSerializer):
    media_file = FileField(write_only=True)

    def validate(self, data):
        media_file = data.pop('media_file')
        file_name = get_media_file_name(media_file)
        file_type = get_media_file_type(media_file)

        access_url = store_media_file(media_file, file_name, file_type)

        data['name'], data['file_type'] = file_name, file_type
        data['access_url'] = access_url

        return data
