from base.serializers import MyBaseSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (
    CharField,
    IntegerField,
    ModelSerializer,
    Serializer
)

from .utils import update_medias


class JournalMasterMediaSerializer(Serializer):
    id = IntegerField()
    access_url = CharField(read_only=True)


class JournalMasterSerializer(MyBaseSerializer):
    medias = JournalMasterMediaSerializer(many=True)

    def validate(self, data):
        start_at = data['start_at']
        end_at = data['end_at']
        if start_at > end_at:
            raise ValidationError({
                'end_at': 'Must be equal to or later than start at'
            })

    def to_internal_value(self, data):
        data['medias'] = list(map(lambda x: {'id': x}, data.get('medias', [])))
        ret = super().to_internal_value(data)
        return ret

    def create(self, validated_data):
        medias = validated_data.pop('medias')
        ret = super().create(validated_data)
        update_medias(ret, medias)
        return ret

    def update(self, instance, validated_data):
        medias = validated_data.pop('medias')
        update_medias(instance, medias)
        ret = super().update(instance, validated_data)
        return ret
