from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date, timedelta

from base.utils import fetch_app_action
from general.gnl_syslog.utils import write_syslog
from stock.models import (
    StockMaster,
    StockCCASSAndPriceSummaryDetail
)


@shared_task
def periodic_create_or_update_ccass_and_price_summary_details():
    w_log('begin')
    stock_codes = get_stock_codes()
    stock_code_count = stock_codes.count()
    w_log(f'total {stock_code_count}')

    url = 'stock/stk_trend/create_or_update_ccass_and_price_summary_detail'
    for idx, stock_code in enumerate(stock_codes):
        request_date, today = get_stock_start_date(stock_code), date.today()
        while request_date < today:
            # create_or_update_summary_detail(stock_code, request_date)
            data = {
                'stock_code': stock_code,
                'date': request_date.strftime('%Y-%m-%d')
            }
            fetch_app_action(url, data)
            # create_or_update_summary_detail(stock_code, request_date)
            request_date += timedelta(days=1)

        w_log(f'finished {idx}/{stock_code_count}: {stock_code}')


def get_stock_start_date(stock_code):
    most_recent_participant_detail = StockCCASSAndPriceSummaryDetail.objects\
        .filter(stock_code=stock_code, enable=True)\
        .order_by('-detail_date')\
        .first()

    if not most_recent_participant_detail:
        start_date = date.today() - timedelta(days=5)
        return start_date

    last_date = most_recent_participant_detail.detail_date
    return last_date + timedelta(days=1)


def get_stock_codes():
    return StockMaster.objects.all()\
        .distinct('stock_code')\
        .values_list('stock_code', flat=True)


def w_log(message, level='DEBUG'):
    name = 'periodic_create_or_update_ccass_and_price_summary_details'
    return write_syslog(name, message, level=level)
