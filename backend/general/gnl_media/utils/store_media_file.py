# from django.conf import settings
from io import BytesIO
from uuid import uuid4

from .get_boto_client import get_boto_client
from .get_media_file_full_path import get_media_file_full_path


def store_media_file(media_file, file_name, file_type):
    u_name = get_unique_media_name(file_name, file_type)
    media_path = get_media_file_full_path(u_name)

    boto_client = get_boto_client()
    boto_client.upload_fileobj(media_file, 'casualapp', media_path)
    return u_name


def get_unique_media_name(file_name, file_type):
    unique_name = uuid4()
    return f'{file_name}_{unique_name}.{file_type}'
