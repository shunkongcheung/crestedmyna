from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import fetch_app_action
from general.gnl_syslog.utils import write_syslog
from ..utils import get_hkex_stock_codes


@shared_task
def periodic_update_or_create_admin_stock_masters():
    w_log('begin')
    stock_codes = get_hkex_stock_codes()
    code_count = len(stock_codes)
    w_log(f'total {code_count}')

    for idx, stock_code in enumerate(stock_codes):
        data = {'stock_code': stock_code, }
        url = 'stock/stk_master/create'
        fetch_app_action(url, data)

    w_log('finish')


def w_log(message):
    name = 'periodic_update_or_create_admin_stock_masters'
    write_syslog(name, message)
