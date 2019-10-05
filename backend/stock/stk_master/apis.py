from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser
from rest_framework import filters

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
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['market_price',
                       'market_value',
                       'name',
                       'realized_value',
                       'stock_code',
                       'share_count',
                       ]

    def get_queryset_by_id(self, queryset, ids):
        return queryset.filter(id__in=ids.split(',')) if ids else queryset

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params
        ids = query_params.get('id__in')
        queryset = self.get_queryset_by_id(queryset, ids)

        return queryset


class StockMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    read_only_fields = read_only_fields
    model = StockMaster
    serializer_class = StockMasterSerializer
