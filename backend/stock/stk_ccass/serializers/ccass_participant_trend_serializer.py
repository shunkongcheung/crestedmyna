from rest_framework.serializers import (
    CharField,
    FloatField,
    Serializer,
)


class CCASSParticipantTrendSerializer(Serializer):
    stock_code = CharField()
    stock_name = CharField()

    diff_percent = FloatField()
    first_percent = FloatField()
    second_percent = FloatField()
