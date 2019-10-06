from rest_framework.serializers import (
    Serializer,
    FloatField,
    PrimaryKeyRelatedField,
)

from stock.models import StockSectorMaster
from stock.stk_portfolio.utils import get_portfolio_summary


class StockPortfolioSummarySerializer(Serializer):
    stock_sector = PrimaryKeyRelatedField(
        required=False,
        queryset=StockSectorMaster.objects.filter(enable=True),
    )

    market_value = FloatField(read_only=True)
    realized_value = FloatField(read_only=True)
    share_count = FloatField(read_only=True)
    unrealized_value = FloatField(read_only=True)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        return super().__init__(*args, **kwargs)

    def validate(self, data):
        stock_sector = data.get('stock_sector')
        return get_portfolio_summary(self.user, stock_sector)
