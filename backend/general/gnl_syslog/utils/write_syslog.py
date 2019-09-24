from django.utils import timezone
from general.gnl_syslog.models import SystemLog


def write_syslog(name,
                 message,
                 created_by,
                 level=SystemLog.LVL_DEBUG[0],
                 is_print=False
                 ):

    if is_print:
        created_by_name = created_by.username
        print(
            f'{timezone.now()}[{level}]: {name} ({created_by_name}) -- {message} --')

    return SystemLog.objects.create(
        name=name,
        level=level,
        message=message,
        created_by=created_by
    )
