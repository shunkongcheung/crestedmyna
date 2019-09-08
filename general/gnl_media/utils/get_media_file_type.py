def get_media_file_type(media_file):
    media_type = media_file.name.split('.')[-1] or ''
    media_type = media_type.lower()
    return media_type
