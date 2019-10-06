from rest_framework.permissions import IsAdminUser

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .models import StockMaster
from .serializers import StockMasterSerializer


fields = ['sector', 'stock_code', ]
read_only_fields = ['market_price',
                    'market_value',
                    'name',
                    'realized_value',
                    'share_count',
                    'turnover',
                    'unrealized_cost',
                    'unrealized_value',
                    ]


class StockMasterCreateAPIView(MyCreateAPIView):
    fields = fields
    read_only_fields = read_only_fields
    model = StockMaster
    serializer_class = StockMasterSerializer


class StockMasterListAPIView(MyListAPIView):
    model = StockMaster
    ordering_fields = '__all__'

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
