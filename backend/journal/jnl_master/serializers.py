from base.serializers import MyBaseSerializer
from general.models import MediaMaster
from rest_framework.serializers import (
    CharField,
    IntegerField,
    ModelSerializer,
    Serializer
)


def update_medias(instance, media_values):
    media_ids = list(map(lambda x: x['id'], media_values))

    # archive removed medias
    archive_medias = instance.medias\
        .exclude(id__in=media_ids)
    archive_medias.update(enable=False)

    # claer all relations
    instance.medias.clear()

    # add back new relations
    medias = MediaMaster.objects.filter(id__in=media_ids,
                                        enable=True,
                                        created_by=instance.created_by
                                        )
    for media in medias:
        instance.medias.add(media)


class JournalMasterMediaSerializer(Serializer):
    id = IntegerField()
    access_url = CharField(read_only=True)


class JournalMasterSerializer(MyBaseSerializer):
    medias = JournalMasterMediaSerializer(many=True)

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
