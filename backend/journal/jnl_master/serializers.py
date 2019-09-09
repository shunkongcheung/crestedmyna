from base.serializers import MyBaseSerializer
from general.models import MediaMaster
from rest_framework.serializers import (
    CharField,
    IntegerField,
    ModelSerializer,
    Serializer
)


def update_images(instance, image_values):
    image_ids = list(map(lambda x: x['id'], image_values))

    # archive removed images
    archive_images = instance.images.filter(enable=True)\
        .exclude(id__in=image_ids)
    archive_images.update(enable=False)

    # claer all relations
    instance.images.clear()

    # add back new relations
    images = MediaMaster.objects.filter(id__in=image_ids, enable=True)
    for image in images:
        instance.images.add(image)


class JournalMasterImageSerializer(Serializer):
    id = IntegerField()
    access_url = CharField(read_only=True)


class JournalMasterSerializer(MyBaseSerializer):
    images = JournalMasterImageSerializer(many=True)

    def create(self, validated_data):
        images = validated_data.pop('images')
        ret = super().create(validated_data)
        update_images(ret, images)
        return ret

    def update(self, instance, validated_data):
        images = validated_data.pop('images')
        update_images(instance, images)
        ret = super().update(instance, validated_data)
        return ret
