from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import get_admin_user
from stock.models import StockMaster
from general.gnl_syslog.utils import write_syslog

from .update_stock_master_market_realtime_price_and_value import (
    update_stock_master_market_realtime_price_and_value
)


@shared_task
def periodic_update_stock_masters_market_realtime_price_and_value():
    w_log('begin')
    stock_codes = get_stock_codes()
    stock_codes_len = len(stock_codes)
    w_log(f'unique stock code count {stock_codes_len}')

    for idx, stock_code in enumerate(stock_codes):
        update_stock_master_market_realtime_price_and_value\
            .apply_async((stock_code,))
        w_log(f'{idx}: {stock_code}')

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
    name = 'periodic_update_stock_masters_market_realtime_price_and_value'
    write_syslog(name, message)
