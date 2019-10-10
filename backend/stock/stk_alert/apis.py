from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .models import StockAlertMaster

fields = ['stock_code',
          'market_price_value',
          'market_price_condition',
          'ccass_percent_value',
          'ccass_percent_condition',
          ]


class StockAlertMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    model = StockAlertMaster

    def get_object(self):
        stock_code = self.kwargs['stock_code']
        sa_master, _ = self.model.objects.get_or_create(
            stock_code=stock_code,
            created_by=self.request.user,
            enable=True,
            defaults={'name': stock_code}
        )
        return sa_master
