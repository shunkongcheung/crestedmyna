from django.db.models import F, Sum, Q

from ..models import StockCCASSAndPriceSummaryDetail


def get_ccass_and_price_trend(date):
    second_date = date.date()
    first_date = get_last_day_with_records(second_date)

    full_queryset = StockCCASSAndPriceSummaryDetail.objects\
        .filter(enable=True)\
        .values('stock_code')\
        .annotate(
            first_percent=get_annotation(first_date, 'participant_percent'),
            second_percent=get_annotation(second_date, 'participant_percent'),
            first_price=get_annotation(first_date, 'nominal_price'),
            second_price=get_annotation(second_date, 'nominal_price'),
        )\
        .values('first_percent',
                'second_percent',
                'first_price',
                'second_price',
                'stock_code'
                )
    diff_queryset = full_queryset\
        .annotate(
            diff_percent=F('second_percent')-F('first_percent'),
            diff_price=F('second_price')-F('first_price'),
        )\
        .filter(diff_percent__isnull=False)\
        .order_by('-diff_percent', '-first_percent', )

    return diff_queryset


def get_annotation(detail_date, field):
    return Sum(field, filter=Q(detail_date=detail_date))


def get_last_day_with_records(cur_date):
    dates = StockCCASSAndPriceSummaryDetail.objects\
        .filter(enable=True)\
        .order_by('-detail_date')\
        .distinct('detail_date')\
        .values_list('detail_date', flat=True)

    try:
        date_list = list(dates)
        cur_idx = date_list.index(cur_date)
    except ValueError:
        return cur_date

    return cur_date if cur_idx == 0 else date_list[cur_idx - 1]
