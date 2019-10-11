from __future__ import absolute_import, unicode_literals
from celery import shared_task
from django.utils import timezone

from base.utils import get_admin_user, send_html_mail
from general.gnl_syslog.utils import write_syslog

from ..models import StockAlertMaster

import json


@shared_task
def send_alert_emails(stock_code, market_price, ccass_percent):
    stock_alert_masters = StockAlertMaster.objects\
        .filter(enable=True)

    ccass_percent_alert_masters = stock_alert_masters\
        .filter(ccass_percent_trigger_at__isnull=True)

    send_alert_emails_for_ccass_percent_above(
        ccass_percent_alert_masters, market_price, ccass_percent
    )
    send_alert_emails_for_ccass_percent_below(
        ccass_percent_alert_masters, market_price, ccass_percent
    )

    stock_price_alert_masters = stock_alert_masters\
        .filter(market_price_trigger_at__isnull=True)

    send_alert_emails_for_stock_price_above(
        stock_price_alert_masters, market_price, ccass_percent
    )
    send_alert_emails_for_stock_price_below(
        stock_price_alert_masters, market_price, ccass_percent
    )


def send_alert_emails_for_ccass_percent_above(stock_alert_masters, market_price, ccass_percent):
    ccass_above = stock_alert_masters.filter(
        ccass_percent_condition=StockAlertMaster.COND_ABOVE,
        ccass_percent_value__lt=ccass_percent,
    )
    cond_type = 'When ccass % is above'
    send_alert_emails_for_queryset(
        ccass_above, cond_type, market_price, ccass_percent
    )
    ccass_above.update(ccass_percent_trigger_at=timezone.now())


def send_alert_emails_for_ccass_percent_below(stock_alert_masters, market_price, ccass_percent):
    ccass_below = stock_alert_masters.filter(
        ccass_percent_condition=StockAlertMaster.COND_BELOW,
        ccass_percent_value__gt=ccass_percent,
    )
    cond_type = 'When ccass % is below'
    send_alert_emails_for_queryset(
        ccass_below, cond_type, market_price, ccass_percent
    )
    ccass_below.update(ccass_percent_trigger_at=timezone.now())


def send_alert_emails_for_stock_price_above(stock_alert_masters, market_price, ccass_percent):
    price_above = stock_alert_masters.filter(
        market_price_condition=StockAlertMaster.COND_ABOVE,
        market_price_value__lt=market_price
    )
    cond_type = 'When price is above'
    send_alert_emails_for_queryset(
        price_above, cond_type, market_price, ccass_percent
    )
    price_above.update(market_price_trigger_at=timezone.now())


def send_alert_emails_for_stock_price_below(stock_alert_masters, market_price, ccass_percent):
    price_below = stock_alert_masters.filter(
        market_price_condition=StockAlertMaster.COND_BELOW,
        market_price_value__gt=market_price
    )
    cond_type = 'When price is below'
    send_alert_emails_for_queryset(
        price_below, cond_type, market_price, ccass_percent
    )
    price_below.update(market_price_trigger_at=timezone.now())


def send_alert_emails_for_queryset(queryset, condition_type, market_price, ccass_percent):
    context = {
        'condition_type': condition_type,
        'market_price': market_price,
        'ccass_percent': ccass_percent,
    }
    recipient_list = [
        stock_alert_master.created_by.email
        for stock_alert_master in queryset
    ]
    send_stock_alert_email(recipient_list, context)


def send_stock_alert_email(recipient_list, context):
    email_template, subject = 'stock/stock_alert.html', 'Stock alert from crested myna'
    send_html_mail(email_template, subject, recipient_list, context)

    context_str = json.dumps(context)
    recipient_list_str = ','.join(recipient_list)
    w_log(f'send stock alert email to: {recipient_list_str} for {context_str}')


def w_log(message):
    position, admin_user = 'send_alert_email_for_prices', get_admin_user()
    write_syslog(position, message, admin_user)
