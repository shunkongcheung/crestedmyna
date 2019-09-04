from general.gnl_syslog.models import SystemLog


def write_syslog(name, level, position, created_by):
    return SystemLog.objects.create(
        name=name,
        level=level,
        position=position,
        created_by=created_by
    )
