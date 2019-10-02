from django.db.models import Avg, F, Q, Sum
from rest_framework.serializers import (
    CharField,
    DateField,
    FloatField,
    Serializer,
)
from .models import (
    CCASSParticipantDetail,
    CCASSParticipantMaster,
)


def get_related_participant_details(start_date, end_date, stock_code):
    related_details = CCASSParticipantDetail.objects\
        .filter(
            detail_date__gte=start_date,
            detail_date__lte=end_date,
            stock_code=stock_code,
            enable=True
        )
    return related_details


def get_participant_masters_by_average(start_date, end_date, stock_code, first_nth):
    related_details_q = Q(participant_details__detail_date__gte=start_date,
                          participant_details__detail_date__lte=end_date,
                          participant_details__stock_code=stock_code,
                          participant_details__enable=True
                          )
    related_details_avg = Avg('participant_details__share_count',
                              filter=related_details_q
                              )
    participant_masters = CCASSParticipantMaster.objects\
        .annotate(related_details_avg=related_details_avg)\
        .exclude(related_details_avg__isnull=True)\
        .order_by('-related_details_avg')[0:first_nth]
    return participant_masters


def get_participant_details(start_date, end_date, stock_code):
    related_details = get_related_participant_details(start_date,
                                                      end_date,
                                                      stock_code
                                                      )
    related_details = related_details\
        .annotate(
            participant_name=F('participant_master__name'),
            participant_id=F('participant_master__id'),
        )
    participant_masters = get_participant_masters_by_average(start_date,
                                                             end_date,
                                                             stock_code,
                                                             5
                                                             )

    related_details = related_details\
        .filter(participant_master__in=participant_masters)
    return related_details\
        .order_by(
            'participant_name',
            'detail_date',
        ) .values(
            'detail_date',
            'share_count',
            'share_percent',
            'participant_name',
            'participant_id',
        )


def get_participant_sums(start_date, end_date, stock_code):
    related_details = get_related_participant_details(start_date,
                                                      end_date,
                                                      stock_code
                                                      )
    return related_details\
        .values('detail_date')\
        .order_by('detail_date')\
        .annotate(total_share_count=Sum('share_count'))\
        .annotate(total_share_percent=Sum('share_percent'))\
        .values('detail_date', 'total_share_count', 'total_share_percent')


class CCASSParticipantDetailItemSerializer(Serializer):
    participant_name = CharField()
    participant_id = CharField()
    share_count = FloatField()
    share_percent = FloatField()
    detail_date = DateField()


class CCASSParticipantSumItemSerializer(Serializer):
    detail_date = DateField()
    total_share_count = FloatField()
    total_share_percent = FloatField()


class CCASSParticipantDetailSerializer(Serializer):
    participant_details = CCASSParticipantDetailItemSerializer(
        many=True, read_only=True
    )
    detail_sums = CCASSParticipantSumItemSerializer(
        many=True, read_only=True
    )
    start_date = DateField()
    end_date = DateField()
    stock_code = CharField()

    def validate(self, data):
        start_date, end_date = data['start_date'], data['end_date']
        stock_code = data['stock_code']
        data['participant_details'] = get_participant_details(start_date,
                                                              end_date,
                                                              stock_code
                                                              )
        data['detail_sums'] = get_participant_sums(start_date,
                                                   end_date,
                                                   stock_code
                                                   )
        return data
