from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from ..models import StockMaster
from ..serializers import StockMasterSerializer
from ..utils import get_hkex_stock_codes


@shared_task
def periodic_update_or_create_admin_stock_masters():
    w_log('begin')
    stock_codes = get_hkex_stock_codes()
    code_count = len(stock_codes)
    w_log(f'total {code_count}')

    admin_user = get_admin_user()
    serializer_class = get_serializer_class()
    for idx, stock_code in enumerate(stock_codes):
        serializer = serializer_class(data={'stock_code': stock_code, })
        if serializer.is_valid():
            serializer.validated_data['created_by'] = admin_user
            serializer.save()
        w_log(f'{idx}/{code_count}: submitted {stock_code}')


def get_serializer_class():
    class SerializerClass(StockMasterSerializer):
        class Meta:
            model = StockMaster
            fields = ['stock_code', 'created_by', 'created_at', 'modified_at']

    return SerializerClass


def w_log(message):
    name = 'periodic_update_or_create_admin_stock_masters'
    write_syslog(name, message)
