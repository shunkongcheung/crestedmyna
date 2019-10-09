from rest_framework.serializers import (
    CharField,
    IntegerField,
    Serializer,
)

from ..utils import get_stock_distribution


class StockPortfolioDistributionItemSerializer(Serializer):
    sector_name = CharField()
    sector = IntegerField()
    value = IntegerField()


class StockPortfolioDistributionSerializer(Serializer):
    count_distributions = StockPortfolioDistributionItemSerializer(
        many=True,
        read_only=True
    )
    market_value_distributions = StockPortfolioDistributionItemSerializer(
        many=True,
        read_only=True
    )
    realized_value_distributions = StockPortfolioDistributionItemSerializer(
        many=True,
        read_only=True
    )
    unrealized_value_distributions = StockPortfolioDistributionItemSerializer(
        many=True,
        read_only=True
    )

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')
        return super().__init__(*args, **kwargs)

    def validate(self, data):
        ret = get_stock_distribution(self.user)
        return ret
