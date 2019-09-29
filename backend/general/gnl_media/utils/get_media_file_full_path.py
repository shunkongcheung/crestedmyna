from django.conf import settings
import os

BASE_DIR = settings.BASE_DIR
IS_DEVELOPMENT = settings.IS_DEVELOPMENT


def get_media_file_full_path(file_name):
    if settings.IS_DEVELOPMENT:
        return os.path.join(f'{BASE_DIR}', 'base/static/m', file_name)
    return os.path.join('/usr/local/casualapp/media', file_name)
