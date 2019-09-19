from base.utils import (
    get_admin_user,
    get_crontab_schedule_from_string,
)

from django_celery_beat.models import PeriodicTask
from django.core.management.base import BaseCommand, CommandError

from general.gnl_syslog.utils import write_syslog
from .utils import get_schedule_tasks


class Command(BaseCommand):
    help = 'create periodic tasks'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        admin = get_admin_user()
        log_name = 'update_beat_tasks'
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
            write_syslog(
                log_name,
                message=f'update_beat_tasks: {idx}/{count:<5} {name}',
                created_by=admin,
                is_print=True
            )
