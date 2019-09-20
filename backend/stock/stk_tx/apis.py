from base.apis import (
    MyCreateAPIView,
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


class StockTxObjectAPIView(MyObjectAPIView):
    http_methods = ['delete']
    model = StockTx

    def perform_destory(self, instance):
        stock_master = instance.stock_master
        super().perform_destory()
        stock_master.share_count = get_stock_master_share_count(stock_master)
        stock_master.market_value = get_stock_master_market_value(stock_master)
        stock_master.save()
