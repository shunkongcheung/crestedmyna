from __future__ import absolute_import, unicode_literals
from celery import shared_task

from general.gnl_syslog.utils import write_syslog

from stock.models import StockMaster
from stock.stk_master.utils import get_realtime_stock_price


@shared_task
def update_stock_master_market_realtime_price_and_value(stock_code):
    last_price = get_realtime_stock_price(stock_code)
    related_stock_masters = StockMaster.objects\
        .filter(stock_code=stock_code, enable=True)

    updated_stock_masters = [
        get_updated_stock_master(stock_master, last_price)
        for stock_master in related_stock_masters
    ]

    updated_fields = ['market_price',
                      'market_value',
                      'unrealized_value',
                      ]
    StockMaster.objects.bulk_update(updated_stock_masters, updated_fields)
    w_log(f'{stock_code}: {last_price}')


def get_updated_stock_master(stock_master, market_price):
    stock_master.market_price = market_price

    market_value = stock_master.share_count * market_price
    stock_master.market_value = market_value

    stock_master.unrealized_value = market_value - stock_master.unrealized_cost

    return stock_master


def w_log(message):
    name = 'update_stock_master_market_realtime_price_and_value'
    write_syslog(name, message)
