from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog

from stock.models import StockMaster
from stock.stk_master.utils import get_stock_last_price


def get_updated_stock_master(stock_master, market_price):
    stock_master.market_price = market_price
    stock_master.market_value = stock_master.share_count * market_price
    return stock_master


@shared_task
def update_stock_masters_market_price_and_value():
    admin_user = get_admin_user()
    write_syslog(
        'update_stock_masters_market_price_and_value',
        'begin',
        admin_user
    )

    stock_masters = StockMaster.objects.filter(enable=True)
    stock_codes = stock_masters.distinct('stock_code')\
        .values_list('stock_code', flat=True)
    stock_codes_len = len(stock_codes)

    write_syslog(
        'update_stock_masters_market_price_and_value',
        f'unique stock code count {stock_codes_len}',
        admin_user
    )

    for idx, stock_code in enumerate(stock_codes):
        last_price = get_stock_last_price(stock_code)
        related_stock_masters = StockMaster.objects\
            .filter(stock_code=stock_code, enable=True)

        updated_stock_masters = [
            get_updated_stock_master(stock_master, last_price)
            for stock_master in related_stock_masters
        ]

        related_stock_masters.bulk_update(updated_stock_masters,
                                          ['market_price', 'market_value']
                                          )
        write_syslog(
            'update_stock_masters_market_price_and_value',
            f'{idx}/{stock_codes_len}: {stock_code} {last_price}',
            admin_user
        )

    write_syslog(
        'update_stock_masters_market_price_and_value',
        'finished',
        admin_user
    )
