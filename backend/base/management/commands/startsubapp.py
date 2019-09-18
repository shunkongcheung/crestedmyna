from django.core.management.base import BaseCommand, CommandError
from django.conf import settings

import os
import shutil


class Command(BaseCommand):
    help = 'create sub application'

    def get_app_files(self):
        return [
            '__init__.py',
            'admin.py',
            'apis.py',
            'models.py',
            'urls.py',
        ]

    def add_arguments(self, parser):
        parser.add_argument('path', nargs='+', type=str)

    def handle(self, *args, **options):
        BASE_DIR = settings.BASE_DIR
        path = options['path'][0]
        to_dir_path = os.path.join(BASE_DIR, path)
        os.mkdir(to_dir_path)
        for file_name in self.get_app_files():
            to_path = os.path.join(to_dir_path, file_name)
            from_path = os.path.join(BASE_DIR,
                                     'base/management/commands/utils',
                                     file_name
                                     )
            shutil.copy(from_path, to_path)
