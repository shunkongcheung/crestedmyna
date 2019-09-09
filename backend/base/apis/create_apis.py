from rest_framework.generics import CreateAPIView
from .base_apis import MyBaseAPIView


class MyCreateAPIView(CreateAPIView, MyBaseAPIView):
    def perform_create(self, serializer):
        serializer.validated_data['created_by'] = self.request.user
        serializer.save()
