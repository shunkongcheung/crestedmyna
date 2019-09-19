from django_celery_beat.models import CrontabSchedule
from django.conf import settings

TIME_ZONE = settings.TIME_ZONE


def get_crontab_schedule_from_string(crontab_string):
    minute, hour, day_of_month, month_of_year, day_of_week = \
        crontab_string.split(" ")

    schedule, created = CrontabSchedule.objects.get_or_create(
        minute=minute,
        hour=hour,
        day_of_month=day_of_month,
        month_of_year=month_of_year,
        day_of_week=day_of_week,
        timezone=TIME_ZONE
    )
    return schedule
