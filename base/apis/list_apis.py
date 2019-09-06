from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.serializers import (
    DateTimeField,
    ModelSerializer,
    SlugRelatedField,
)

from .base_apis import MyBaseAPIView


class LocalTime(DateTimeField):
    def to_representation(self, value):
        return timezone.localtime(value)


class MyListViewBaseSerializer(ModelSerializer):
    created_by = SlugRelatedField(slug_field='username', read_only=True)
    created_at = LocalTime(read_only=True)
    modified_at = LocalTime(read_only=True)


class MyListAPIView(ListAPIView, MyBaseAPIView):
    fields = ['name', ]
    search_fields = ['name', ]
    filter_fields = ['name', ]

    def get_serializer_class(self, *args, **kwargs):
        model_fields = ['id', ] + self.fields

        class MyListViewSerializer(MyListViewBaseSerializer):
            class Meta:
                model = self.model
                fields = model_fields

        return MyListViewSerializer
