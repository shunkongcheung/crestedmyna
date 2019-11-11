from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .serializers import (
    StockNoticeShareHolderSerializer,
)

from .utils import get_substantial_shareholders


class StockNoticeShareholderListAPIView(MyListAPIView):
    def filter_queryset(self, queryset):
        return queryset

    def get_queryset(self):
        stock_code = self.kwargs['stock_code']
        return get_substantial_shareholders(stock_code)

    def get_serializer_class(self, *args, **kwargs):
        return StockNoticeShareHolderSerializer


# class StockNoticeObjectAPIView(MyObjectAPIView):
#     fields = fields
#     model = StockNotice
#     serializer_class = StockNoticeSerializer
