from datetime import datetime

from base.apis import MyListAPIView, MyCreateAPIView
from stock.models import StockMaster

from .serializers import (
    StockCCASSAndPriceTrendSerializer,
    StockTrendSerializer,
)
from .utils import get_ccass_and_price_trend


class StockTrendAPIView(MyCreateAPIView):
    serializer_class = StockTrendSerializer

    def perform_create(self, validated_data):
        pass


class StockCCASSAndPriceTrendListAPIView(MyListAPIView):
    serializer_class = StockCCASSAndPriceTrendSerializer
    ordering_fields = ['diff_percent',
                       'first_percent',
                       'second_percent',
                       'diff_turnover',
                       'first_turnover',
                       'second_turnover',
                       ]

    def get_stock_master_name(self, stock_code):
        stock_master = StockMaster.objects\
            .filter(stock_code=stock_code)\
            .first()
        return stock_master.name if stock_master else stock_code

    def filter_queryset(self, queryset):
        filtered_queryset = super().filter_queryset(queryset)

        for filtered_itm in filtered_queryset:
            stock_code = filtered_itm['stock_code']
            stock_name = self.get_stock_master_name(stock_code)
            filtered_itm['stock_name'] = stock_name

        return filtered_queryset

    def get_queryset(self):
        date = self.kwargs['date']
        date = datetime.strptime(date, '%Y%m%d')
        return get_ccass_and_price_trend(date)
