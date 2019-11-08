from __future__ import absolute_import, unicode_literals
from celery import shared_task

from general.gnl_syslog.utils import write_syslog
from stock.models import CCASSParticipantDetail, StockMaster
from . import send_alert_emails


@shared_task
def periodic_send_alert_emails():
    stock_masters = StockMaster.objects.distinct('stock_code')
    total_len = stock_masters.count()
    w_log(f'total len: {total_len}')

    for idx, stock_master in enumerate(stock_masters):
        stock_code = stock_master.stock_code
        market_price = stock_master.market_price
        ccass_percent = get_ccass_percent(stock_code)
        async_packet = stock_code, market_price, ccass_percent,
        send_alert_emails.apply_async(async_packet)
        w_log(f'triggered: {stock_code} {idx}/{total_len}')

    w_log('finished')


def get_ccass_percent(stock_code):
    ccass_detail = CCASSParticipantDetail.objects\
        .filter(enable=True, stock_code=stock_code)\
        .order_by('-detail_date')\
        .first()
    return ccass_detail.share_percent if ccass_detail else 0


def w_log(message):
    name = 'periodic_send_alert_emails'
    write_syslog(name, message)
