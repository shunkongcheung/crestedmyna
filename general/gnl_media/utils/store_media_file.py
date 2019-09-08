from backend.settings import (
    BASE_DIR,
    STATIC_URL,
    IS_DEVELOPMENT,
)
from io import BytesIO
from uuid import uuid4
import os


def get_unique_media_name(file_name, file_type):
    unique_name = uuid4()
    return f'{file_name}_{unique_name}.{file_type}'


def get_media_file_full_path(file_name):
    if IS_DEVELOPMENT:
        return os.path.join(f'{BASE_DIR}', 'base', 'static', 'm', file_name)
    return os.path.join(f'{BASE_DIR}{STATIC_URL}', 'm', file_name)


def store_media_file(media_file, file_name, file_type):
    u_name = get_unique_media_name(file_name, file_type)
    media_path = get_media_file_full_path(u_name)
    with open(media_path, 'wb') as file:
        file.write(media_file.read())

    return f'http://localhost:8000/static/m/{u_name}'
