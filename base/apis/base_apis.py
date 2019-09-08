from base.serializers import MyBaseSerializer

from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated


class MyBaseAPIView(GenericAPIView):
    fields = ['name', ]
    read_only_fields = []
    permissions_classes = [IsAuthenticated, ]
    serializer_class = MyBaseSerializer

    def get_serializer_class(self, *args, **kwargs):
        prepend_fields = ['id', ]
        propend_fields = ['created_by', 'created_at', 'modified_at', ]
        model_fields = prepend_fields + self.fields + \
            self.read_only_fields + propend_fields

        class MyBaseViewSerializer(self.serializer_class):
            class Meta:
                model = self.model
                fields = model_fields
                read_only_fields = self.read_only_fields

        return MyBaseViewSerializer

    def get_queryset(self):
        return self.model.objects.filter(created_by=self.request.user,
                                         enable=True
                                         )
