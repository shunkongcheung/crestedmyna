from django.conf import settings
from general.gnl_lookup.utils import get_lookup_value
from io import BytesIO
from uuid import uuid4

from .get_media_file_full_path import get_media_file_full_path

IS_DEVELOPMENT = settings.IS_DEVELOPMENT


def get_unique_media_name(file_name, file_type):
    unique_name = uuid4()
    return f'{file_name}_{unique_name}.{file_type}'


# def get_media_file_path(unique_name):
#     host_name = get_lookup_value('HOST_NAME', 'GENERAL')
#     if settings.IS_DEVELOPMENT:
#         return f'{host_name}/static/m/{unique_name}'
#     return f'{host_name}/media/{unique_name}'


def store_media_file(media_file, file_name, file_type):
    u_name = get_unique_media_name(file_name, file_type)
    media_path = get_media_file_full_path(u_name)
    with open(media_path, 'wb') as file:
        file.write(media_file.read())

    return u_name
