from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import StockTx
from .serializers import StockTxSerializer


class StockTxCreateAPIView(MyCreateAPIView):
    fields = ['stock_master', 'tx_type', 'share_count', 'price', ]
    model = StockTx
    serializer_class = StockTxSerializer


class StockTxListAPIView(MyListAPIView):
    fields = ['name', 'stock_master', 'tx_type', 'share_count', 'price',
              'gross_value', 'trade_cost', 'net_value',
              ]
    filter_fields = ['stock_master__stock_code',
                     # '>=created_at',
                     # '<=created_at',
                     ]
    model = StockTx


class StockTxObjectAPIView(MyObjectAPIView):
    http_methods = ['delete']
    model = StockTx
