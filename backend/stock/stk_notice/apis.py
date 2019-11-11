from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .serializers import (
    StockNoticeItemSerializer,
    StockNoticeShareHolderSerializer,
)

from .utils import (
    get_notice_list,
    get_substantial_shareholders,
)


class StockNoticeListAPIView(MyListAPIView):
    def filter_queryset(self, queryset):
        return queryset

    def get_queryset(self):
        stock_code = self.kwargs['stock_code']
        return get_notice_list(stock_code)

    def get_serializer_class(self, *args, **kwargs):
        return StockNoticeItemSerializer


class StockNoticeShareholderListAPIView(MyListAPIView):
    def filter_queryset(self, queryset):
        return queryset

    def get_queryset(self):
        stock_code = self.kwargs['stock_code']
        return get_substantial_shareholders(stock_code)

    def get_serializer_class(self, *args, **kwargs):
        return StockNoticeShareHolderSerializer
