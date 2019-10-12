from django.utils import timezone

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from stock.models import (
    StockMaster,
    StockAlertMaster,
)

read_only_fields = [
    'name',
    'market_price_trigger_at',
    'ccass_percent_trigger_at',
]
fields = ['stock_code',
          'market_price_value',
          'market_price_condition',
          'ccass_percent_value',
          'ccass_percent_condition',
          ]


class StockAlertMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    read_only_fields = read_only_fields
    model = StockAlertMaster

    def perform_update(self, serializer):
        serializer.validated_data['market_price_trigger_at'] = None
        serializer.validated_data['ccass_percent_trigger_at'] = None
        return super().perform_update(serializer)

    def get_stock_master_name(self, stock_code):
        return StockMaster.objects.filter(stock_code=stock_code).first().name

    def get_object(self):
        stock_code = self.kwargs['stock_code']
        cur_time = timezone.now()
        stock_name = self.get_stock_master_name(stock_code)
        defaults = {
            'name': stock_name,
            'market_price_trigger_at': cur_time,
            'ccass_percent_trigger_at': cur_time,

        }
        sa_master, _ = self.model.objects.get_or_create(
            stock_code=stock_code,
            created_by=self.request.user,
            enable=True,
            defaults=defaults
        )
        return sa_master
