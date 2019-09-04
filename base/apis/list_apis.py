from .base_apis import MyBaseAPIView
from base.serializers.list_serializer import MyListViewSerializer
from rest_framework.generics import ListAPIView


class MyListAPIView(ListAPIView, MyBaseAPIView):
    serializer_class = MyListViewSerializer
