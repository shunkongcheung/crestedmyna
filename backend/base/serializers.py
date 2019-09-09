from django.utils import timezone
from rest_framework.serializers import (
    DateTimeField,
    ModelSerializer,
    SlugRelatedField,
)


class LocalTime(DateTimeField):
    def to_representation(self, value):
        return timezone.localtime(value)


class MyBaseSerializer(ModelSerializer):
    created_by = SlugRelatedField(slug_field='username', read_only=True)
    created_at = LocalTime(read_only=True)
    modified_at = LocalTime(read_only=True)
