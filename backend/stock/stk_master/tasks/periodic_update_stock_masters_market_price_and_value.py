from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import (
    get_admin_user,
    fetch_app_action,
)
from stock.models import StockMaster
from general.gnl_syslog.utils import write_syslog


@shared_task
def periodic_update_stock_masters_market_price_and_value():
    w_log('begin')
    stock_codes = get_stock_codes()
    stock_codes_len = len(stock_codes)
    w_log(f'unique stock code count {stock_codes_len}')

    for idx, stock_code in enumerate(stock_codes):
        url = 'stock/stk_master/update_stock_master_market_price_and_value'
        data = {'stock_code': stock_code}
        fetch_app_action(url, data)

    w_log('finished')


def get_stock_codes():
    admin_user = get_admin_user()
    stock_masters = StockMaster.objects.filter(enable=True)
    stock_codes = stock_masters\
        .exclude(created_by=admin_user)\
        .distinct('stock_code')\
        .values_list('stock_code', flat=True)
    return stock_codes


def w_log(message):
    name = 'periodic_update_stock_masters_market_price_and_value'
    write_syslog(name, message)
