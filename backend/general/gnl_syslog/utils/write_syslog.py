from django.utils import timezone

from base.utils import get_admin_user
from general.gnl_syslog.models import SystemLog

import logging


def write_syslog(
    name,
    message,
    created_by=None,
    level=SystemLog.LVL_DEBUG[0],
    is_print=False
):
    if not created_by:
        created_by = get_admin_user()

    if is_print:
        created_by_name = created_by.username
        print(
            f'{timezone.now()}[{level}]: {name} ({created_by_name}) -- {message} --')
    write_to_logger(name, level, message, created_by)

    return SystemLog.objects.create(
        name=name,
        level=level,
        message=message,
        created_by=created_by
    )


def write_to_logger(name, level, message, created_by):
    logger = logging.getLogger(name)

    if level == SystemLog.LVL_DEBUG[0]:
        log_level, log_func = logging.DEBUG, logging.debug
    if level == SystemLog.LVL_INFO[0]:
        log_level, log_func = logging.INFO, logging.info
    if level == SystemLog.LVL_ERROR[0]:
        log_level, log_func = logging.ERROR, logging.error

    created_by_msg = f'{created_by.username}(created_by.id)'

    logger.setLevel(log_level)
    log_func(f'{created_by_msg} :{message}')
