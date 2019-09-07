from django.utils import timezone
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
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


class MyBaseAPIView(GenericAPIView):
    fields = ['name', ]
    permissions_classes = [IsAuthenticated, ]

    def get_serializer_class(self, *args, **kwargs):
        prepend_fields = ['id', ]
        propend_fields = ['created_by', 'created_at', 'modified_at', ]
        model_fields = prepend_fields + self.fields + propend_fields

        class MyBaseViewSerializer(MyBaseSerializer):
            class Meta:
                model = self.model
                fields = model_fields

        return MyBaseViewSerializer

    def get_queryset(self):
        return self.model.objects.filter(created_by=self.request.user,
                                         enable=True
                                         )
