from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import StockMaster


class StockMasterCreateAPIView(MyCreateAPIView):
    fields = ['name', 'stock_code', 'industry', 'catagory', ]
    model = StockMaster


class StockMasterListAPIView(MyListAPIView):
    model = StockMaster


class StockMasterObjectAPIView(MyObjectAPIView):
    fields = ['name', 'stock_code', 'industry', 'catagory', ]
    read_only_fields = ['share_count',
                        'market_price',
                        'total_value',
                        'realized_value', ]
    model = StockMaster

    def get_object(self):
        ret = super().get_object()
        return ret
