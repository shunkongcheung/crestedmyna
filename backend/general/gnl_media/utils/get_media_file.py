from io import BytesIO

from .get_boto_client import get_boto_client
from .get_media_file_full_path import get_media_file_full_path


def get_media_file(file_name):
    media_full_path = get_media_file_full_path(file_name)
    boto_client = get_boto_client()

    media_file = BytesIO()
    boto_client.download_fileobj('casualapp', media_full_path, media_file)
    return media_file.getvalue()
