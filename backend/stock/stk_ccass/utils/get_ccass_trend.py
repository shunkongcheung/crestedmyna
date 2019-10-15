from django.db.models import F, Sum, Q
from datetime import timedelta

from stock.models import (
    CCASSParticipantDetail,
    StockMaster,
)


def get_annotation(detail_date):
    return Sum('share_percent', filter=Q(detail_date=detail_date))


def get_last_day_with_records(cur_date):
    dates = CCASSParticipantDetail.objects\
        .filter(enable=True)\
        .order_by('-detail_date')\
        .distinct('detail_date')\
        .values_list('detail_date', flat=True)

    date_list = list(dates)
    cur_idx = date_list.index(cur_date)
    if cur_idx == 0:
        return cur_date
    return date_list[cur_idx - 1]


def get_ccass_trend(date):
    second_date = date.date()
    first_date = get_last_day_with_records(second_date)

    full_queryset = CCASSParticipantDetail.objects\
        .filter(enable=True)\
        .values('stock_code')\
        .annotate(
            first_percent=get_annotation(first_date),
            second_percent=get_annotation(second_date)
        )\
        .values('first_percent', 'second_percent', 'stock_code')

    diff_queryset = full_queryset\
        .annotate(diff_percent=F('second_percent')-F('first_percent'))\
        .filter(diff_percent__isnull=False)\
        .order_by('-diff_percent', '-first_percent', )

    return diff_queryset
