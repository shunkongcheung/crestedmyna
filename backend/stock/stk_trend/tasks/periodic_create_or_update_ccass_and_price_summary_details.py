from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date, timedelta

from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from stock.models import (
    StockMaster,
    StockCCASSAndPriceSummaryDetail
)
from ..utils import get_stock_ccass_and_price


@shared_task
def periodic_create_or_update_ccass_and_price_summary_details():
    w_log('begin')
    stock_codes = get_stock_codes()
    stock_code_count = stock_codes.count()
    w_log(f'total {stock_code_count}')

    for idx, stock_code in enumerate(stock_codes):
        request_date, today = get_stock_start_date(stock_code), date.today()
        while request_date < today:
            create_or_update_summary_detail(stock_code, request_date)
            request_date += timedelta(days=1)

        w_log(f'finished {idx}/{stock_code_count}: {stock_code}')


def create_or_update_summary_detail(stock_code, request_date):
    try:
        admin_user = get_admin_user()
        participant_percent, nominal_price, turnover = get_stock_ccass_and_price(
            stock_code,
            request_date
        )
        StockCCASSAndPriceSummaryDetail.objects.update_or_create(
            detail_date=request_date,
            stock_code=stock_code,
            defaults={
                'name': stock_code,
                'created_by': admin_user,
                'nominal_price': nominal_price,
                'participant_percent': participant_percent,
                'turnover': turnover,
            }
        )
    except Exception as ex:
        w_log(
            f'cannot create {stock_code} {str(request_date)} {str(ex)}', 'ERROR')


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
