from django.utils import timezone

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .models import StockAlertMaster

read_only_fields = [
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

    def get_object(self):
        stock_code = self.kwargs['stock_code']
        cur_time = timezone.now()
        defaults = {
            'name': stock_code,
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
