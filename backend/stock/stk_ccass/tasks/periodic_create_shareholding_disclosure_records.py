from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import date, timedelta


from base.utils import get_admin_user
# from base.utils import (
#     fetch_app_action,
#     get_admin_user,
# )
from general.gnl_syslog.utils import write_syslog
from stock.models import (
    CCASSParticipantDetail,
    StockMaster,
)

from .create_shareholding_disclosure_records import (
    create_shareholding_disclosure_records
)


@shared_task
def periodic_create_shareholding_disclosure_records():
    w_debug('begin.')
    # get all stock code
    stock_codes = get_stock_codes()
    # trigger for today
    for stock_code in stock_codes:
        request_date, today = get_stock_start_date(stock_code), date.today()
        while request_date < today:
            request_date_str = request_date.strftime("%Y-%m-%dT%H:%M:%SZ")
            # url = 'stock/stk_ccass/create_shareholding_disclosure_records'
            # data = {
            #     'stock_code': stock_code,
            #     'date': request_date_str
            # }
            # fetch_app_action(url, data)
            create_shareholding_disclosure_records\
                .apply_async((stock_code, request_date_str,))
            request_date += timedelta(days=1)

    # trigger for past?
    w_debug('finished.')


def get_stock_start_date(stock_code):
    most_recent_participant_detail = CCASSParticipantDetail.objects\
        .filter(stock_code=stock_code, enable=True)\
        .order_by('-detail_date')\
        .first()

    if not most_recent_participant_detail:
        two_years_ago = date.today() - timedelta(days=365*2)
        return two_years_ago

    last_date = most_recent_participant_detail.detail_date
    return last_date + timedelta(days=1)


def get_stock_codes():
    admin_user = get_admin_user()
    return StockMaster.objects\
        .filter(enable=True)\
        .exclude(created_by=admin_user)\
        .distinct('stock_code')\
        .values_list('stock_code', flat=True)


def w_debug(message):
    name = 'periodic_create_shareholding_disclosure_records'
    return write_syslog(name, message)
