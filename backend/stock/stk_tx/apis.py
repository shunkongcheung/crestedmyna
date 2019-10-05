from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import StockTx
from .serializers import StockTxSerializer
from .utils import (
    get_stock_master_share_count,
    get_stock_master_market_value,
)


fields = ['stock_master', 'tx_type', 'tx_at', 'share_count', 'price', ]


class StockTxCreateAPIView(MyCreateAPIView):
    fields = fields
    model = StockTx
    serializer_class = StockTxSerializer


class StockTxListAPIView(MyListAPIView):
    fields = fields + ['gross_value', 'trade_cost', 'net_value', ]
    model = StockTx

    def filter_queryset_by_type(self, queryset, tx_types):
        return queryset.filter(tx_type__in=tx_types.split(',')) \
            if tx_types else queryset

    def filter_queryset_by_master(self, queryset, stock_masters):
        return queryset.filter(stock_master__in=stock_masters.split(',')) \
            if stock_masters else queryset

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params
        stock_masters = query_params.get('stock_master__in')
        tx_types = query_params.get('tx_type__in')
        queryset = self.filter_queryset_by_type(queryset, tx_types)
        queryset = self.filter_queryset_by_master(queryset, stock_masters)
        return queryset.filter(stock_master__enable=True)


class StockTxObjectAPIView(MyObjectAPIView):
    http_methods = ['delete']
    model = StockTx

    def perform_destory(self, instance):
        stock_master = instance.stock_master
        super().perform_destory()
        stock_master.share_count = get_stock_master_share_count(stock_master)
        stock_master.market_value = get_stock_master_market_value(stock_master)
        stock_master.save()
