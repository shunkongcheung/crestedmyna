from rest_framework.serializers import (
    Serializer,
    FloatField,
    IntegerField,
    ListField,
)

from stock.models import StockSectorMaster
from stock.stk_portfolio.utils import get_portfolio_summary


class StockPortfolioSummarySerializer(Serializer):
    sectors = ListField(child=IntegerField(), write_only=True, required=False)

    market_value = FloatField(read_only=True)
    realized_value = FloatField(read_only=True)
    unrealized_value = FloatField(read_only=True)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        return super().__init__(*args, **kwargs)

    def validate_sectors(self, sectors):
        return StockSectorMaster.objects\
            .filter(enable=True, id__in=sectors)

    def validate(self, data):
        stock_sectors = data.get('sectors')
        return get_portfolio_summary(self.user, stock_sectors)
