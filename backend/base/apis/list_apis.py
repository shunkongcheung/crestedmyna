from rest_framework.generics import ListAPIView

from .base_apis import MyBaseAPIView


class MyListAPIView(ListAPIView, MyBaseAPIView):
    search_fields = ['name', ]
    filter_fields = ['name', ]
    ordering_fields = []
