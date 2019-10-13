from rest_framework.serializers import (
    CharField,
    FloatField,
    Serializer,
)


class CCASSParticipantTrendSerializer(Serializer):
    participant_name = CharField()

    diff_percent = FloatField()
    first_percent = FloatField()
    second_percent = FloatField()
