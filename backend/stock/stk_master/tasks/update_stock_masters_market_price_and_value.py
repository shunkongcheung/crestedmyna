from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog

from stock.models import StockMaster
from stock.stk_master.utils import get_stock_last_status


def get_updated_stock_master(stock_master, market_price, turnover):
    stock_master.market_price = market_price

    market_value = stock_master.share_count * market_price
    stock_master.market_value = market_value

    stock_master.unrealized_value = market_value - stock_master.unrealized_cost
    stock_master.turnover = turnover

    return stock_master


@shared_task
def update_stock_masters_market_price_and_value():
    w_log('begin')
    stock_masters = StockMaster.objects.filter(enable=True)
    stock_codes = stock_masters.distinct('stock_code')\
        .values_list('stock_code', flat=True)
    stock_codes_len = len(stock_codes)

    w_log(f'unique stock code count {stock_codes_len}')

    for idx, stock_code in enumerate(stock_codes):
        last_price, turnover = get_stock_last_status(stock_code)
        related_stock_masters = StockMaster.objects\
            .filter(stock_code=stock_code, enable=True)

        updated_stock_masters = [
            get_updated_stock_master(stock_master, last_price, turnover)
            for stock_master in related_stock_masters
        ]

        updated_fields = ['market_price',
                          'market_value',
                          'turnover',
                          'unrealized_value',
                          ]
        StockMaster.objects.bulk_update(updated_stock_masters, updated_fields)
        w_log(f'{idx}/{stock_codes_len}: {stock_code} {last_price}')

    w_log('finished')


def w_log(message):
    admin_user = get_admin_user()
    write_syslog(
        'update_stock_masters_market_price_and_value',
        message,
        admin_user
    )
