from datetime import datetime

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
)
from stock.models import StockMaster

from .utils import get_ccass_trend
from .serializers import (
    CCASSParticipantDetailSerializer,
    CCASSParticipantTrendSerializer,
)


class CCASSParticipantDetailAPIView(MyCreateAPIView):
    serializer_class = CCASSParticipantDetailSerializer

    def perform_create(self, validated_date):
        pass


class CCASSParticipantTrendAPIView(MyListAPIView):
    serializer_class = CCASSParticipantTrendSerializer

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
        return get_ccass_trend(date)
