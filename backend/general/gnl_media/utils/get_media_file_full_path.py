from django.conf import settings
IS_DEVELOPMENT = settings.IS_DEVELOPMENT


def get_media_file_full_path(file_name):
    if settings.IS_DEVELOPMENT:
        return f'dev/{file_name}'
    return f'prod/{file_name}'
