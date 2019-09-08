def get_media_file_name(media_file):
    media_name = '.'.join(media_file.name.split('.')[0:-1])
    return media_name
