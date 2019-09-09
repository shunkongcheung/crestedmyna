from rest_framework.mixins import (
    UpdateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
)
from .base_apis import MyBaseAPIView


class MyObjectAPIView(UpdateModelMixin,
                      RetrieveModelMixin,
                      DestroyModelMixin,
                      MyBaseAPIView
                      ):
    def get(self, request, *args, **kwargs):
        retrieve = self.retrieve or super(MyObjectAPIView, self).retrieve
        return retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        update = self.update or super(MyObjectAPIView, self).update
        return update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        destroy = self.destroy or super(MyObjectAPIView, self).destroy
        return destroy(request, *args, **kwargs)

    def perform_destroy(self, instance):
        instance.enable = False
        instance.save()
