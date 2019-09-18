from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import StockMaster
from .serializers import StockMasterSerializer


fields = ['stock_code', ]
read_only_fields = ['name',
                    'share_count',
                    'market_price',
                    'market_value',
                    'realized_value', ]


class StockMasterCreateAPIView(MyCreateAPIView):
    fields = fields
    model = StockMaster
    serializer_class = StockMasterSerializer


class StockMasterListAPIView(MyListAPIView):
    model = StockMaster


class StockMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    read_only_fields = read_only_fields
    model = StockMaster
    serializer_class = StockMasterSerializer
