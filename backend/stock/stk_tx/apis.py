from base.apis import (
    MyCreateAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import StockTx
from .serializers import StockTxSerializer


fields = ['stock_master', 'tx_type', 'share_count', 'price', ]


class StockTxCreateAPIView(MyCreateAPIView):
    fields = fields
    model = StockTx
    serializer_class = StockTxSerializer


class StockTxObjectAPIView(MyObjectAPIView):
    http_methods = ['delete']
    model = StockTx
