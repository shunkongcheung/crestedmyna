from django_celery_beat.models import PeriodicTask
from django.core.management.base import BaseCommand, CommandError

from base.utils import get_crontab_schedule_from_string
from .utils import get_schedule_tasks


class Command(BaseCommand):
    help = 'create periodic tasks'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        print('update_beat_tasks: begin')

        schedule_tasks = get_schedule_tasks()
        count = len(schedule_tasks)

        for idx, schedule_task in enumerate(schedule_tasks):
            name, crontab_str = schedule_task['name'], schedule_task['crontab']
            task = schedule_task['task']
            crontab_schedule = get_crontab_schedule_from_string(crontab_str)
            periodic_task = PeriodicTask.objects.update_or_create(
                name=name,
                defaults={'task': task, 'crontab': crontab_schedule}
            )
            print(f'update_beat_tasks: {idx}/{count:<5} {name}')

        print('update_beat_tasks: finished.')
