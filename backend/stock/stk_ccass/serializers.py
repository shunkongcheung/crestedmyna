from django.db.models import F
from rest_framework.serializers import (
    CharField,
    DateField,
    FloatField,
    Serializer,
)
from .models import CCASSParticipantDetail


def get_participant_details(start_date, end_date, stock_code):
    return CCASSParticipantDetail.objects\
        .filter(
            detail_date__gte=start_date,
            detail_date__lte=end_date,
            stock_code=stock_code,
            enable=True
        ).annotate(
            participant_name=F('participant_master__name'),
            participant_id=F('participant_master__id'),
        ).order_by(
            'participant_name',
            'detail_date',
        ).values(
            'detail_date',
            'share_count',
            'share_percent',
            'participant_name',
            'participant_id',
        )


class CCASSParticipantDetailItemSerializer(Serializer):
    participant_name = CharField()
    participant_id = CharField()
    share_count = FloatField()
    share_percent = FloatField()
    detail_date = DateField()


class CCASSParticipantDetailSerializer(Serializer):
    participant_details = CCASSParticipantDetailItemSerializer(
        many=True, read_only=True
    )
    start_date = DateField()
    end_date = DateField()
    stock_code = CharField()

    def validate(self, data):
        start_date, end_date = data['start_date'], data['end_date']
        stock_code = data['stock_code']
        participant_details = get_participant_details(start_date,
                                                      end_date,
                                                      stock_code
                                                      )
        data['participant_details'] = participant_details
        return data
