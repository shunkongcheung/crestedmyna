from rest_framework.permissions import IsAdminUser

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from stock.models import (
    StockMaster,
    StockSectorMaster,
)
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

    def get_queryset_by_sectors(self, queryset, sector_ids):
        if not sector_ids:
            return queryset
        sector_masters = StockSectorMaster.objects\
            .filter(enable=True, id__in=sector_ids.split(','))
        return queryset.filter(sector__in=sector_masters)

    def get_queryset(self):
        queryset = super().get_queryset()
        query_params = self.request.query_params

        ids = query_params.get('id__in')
        queryset = self.get_queryset_by_id(queryset, ids)

        sector_ids = query_params.get('sector__in')
        queryset = self.get_queryset_by_sectors(queryset, sector_ids)

        return queryset


class StockMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    read_only_fields = read_only_fields
    model = StockMaster
    serializer_class = StockMasterSerializer
