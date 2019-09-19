from __future__ import absolute_import, unicode_literals
from celery import shared_task

from stock.models import StockMaster
from stock.stk_master.utils import get_stock_last_price


def get_updated_stock_master(stock_master, market_price):
    stock_master.market_price = market_price
    stock_master.market_value = stock_master.share_count * market_price
    return stock_master


@shared_task
def update_stock_masters_market_price_and_value():
    stock_masters = StockMaster.objects.filter(enable=True)
    stock_codes = stock_masters.distinct('stock_code')\
        .values_list('stock_code', flat=True)
    for stock_code in stock_codes:
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
