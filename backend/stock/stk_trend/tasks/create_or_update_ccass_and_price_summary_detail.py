from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import get_admin_user
from stock.models import (
    StockCCASSAndPriceSummaryDetail
)
from ..utils import get_stock_ccass_and_price


@shared_task
def create_or_update_ccass_and_price_summary_detail(stock_code, request_date):
    admin_user = get_admin_user()
    participant_percent, participant_share, nominal_price, turnover = \
        get_stock_ccass_and_price(
            stock_code,
            request_date
        )
    defaults = {
        'name': stock_code,
        'created_by': admin_user,
        'nominal_price': nominal_price,
        'participant_percent': participant_percent,
        'participant_share': participant_share,
        'turnover': turnover,
    }
    StockCCASSAndPriceSummaryDetail.objects.update_or_create(
        detail_date=request_date,
        stock_code=stock_code,
        defaults=defaults
    )
