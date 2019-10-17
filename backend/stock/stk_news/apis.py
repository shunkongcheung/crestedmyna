from datetime import datetime, timedelta


from base.apis import MyListAPIView

from .serializers import StockNewsSerializer
from .utils import get_news_from_hkex


class StockNewsListAPIView(MyListAPIView):
    def get_serializer_class(self, *args, **kwargs):
        return StockNewsSerializer

    def filter_queryset(self, queryset):
        return queryset

    def get_queryset(self):
        stock_code = self.kwargs['stock_code']

        to_date = datetime.now()
        from_date = to_date - timedelta(days=365)

        return get_news_from_hkex(stock_code, from_date, to_date)
