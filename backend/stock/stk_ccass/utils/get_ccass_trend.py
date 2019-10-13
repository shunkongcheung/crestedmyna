from django.db.models import F, Sum, Q
from datetime import timedelta

from ..models import CCASSParticipantDetail


def get_named_ccass_detail():
    valid_queryset = CCASSParticipantDetail.objects.filter(enable=True)
    named_queryset = valid_queryset\
        .annotate(participant_name=F('participant_master__name'))

    return named_queryset


def get_annotation(detail_date):
    return Sum('share_percent', filter=Q(detail_date=detail_date))


def get_ccass_trend(date):
    today, ytd = date, date - timedelta(days=1)
    named_queryset = get_named_ccass_detail()
    full_queryset = named_queryset\
        .values('participant_name')\
        .annotate(
            first_percent=get_annotation(ytd),
            second_percent=get_annotation(today)
        )\
        .values('first_percent', 'second_percent', 'participant_name')

    diff_queryset = full_queryset\
        .annotate(diff_percent=F('second_percent')-F('first_percent'))\
        .filter(diff_percent__isnull=False)\
        .order_by('-diff_percent', '-first_percent', )
    return diff_queryset
