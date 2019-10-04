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
    read_only_fields = read_only_fields
    model = StockMaster
    serializer_class = StockMasterSerializer


class StockMasterListAPIView(MyListAPIView):
    model = StockMaster

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params
        ids = query_params.get('id__in')
        if ids:
            return queryset.filter(id__in=ids.split(','))
        else:
            return queryset


class StockMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    read_only_fields = read_only_fields
    model = StockMaster
    serializer_class = StockMasterSerializer
