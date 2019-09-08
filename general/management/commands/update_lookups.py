from base.utils import get_admin_user

from django.core.management.base import BaseCommand, CommandError
from django.conf import settings

from general.models import LookUp
from general.gnl_syslog.utils import write_syslog


from general.gnl_lookup.utils import get_lookups


class Command(BaseCommand):
    help = 'create lookup table'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        admin = get_admin_user()
        lookups = get_lookups()

        log_name = 'update_lookups'
        for idx, lookup in enumerate(lookups):
            lookup_name, lookup_catagory = lookup['name'], lookup['catagory']
            lookup['created_by'] = admin

            _, created = LookUp.objects.update_or_create(
                name=lookup_name,
                catagory=lookup_catagory,
                defaults=lookup
            )

            created_msg = 'created' if created else 'updated'
            write_syslog(
                log_name,
                message=f'{idx}: {lookup_name} {lookup_catagory} {created_msg}',
                created_by=admin,
                is_print=True
            )
