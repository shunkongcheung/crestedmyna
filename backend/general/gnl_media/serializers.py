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

        unique_name = store_media_file(media_file, file_name, file_type)
        data['file_name'], data['file_type'] = unique_name, file_type
        return data
