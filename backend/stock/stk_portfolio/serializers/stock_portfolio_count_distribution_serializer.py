from rest_framework.serializers import (
    CharField,
    IntegerField,
    Serializer,
)

from ..utils import get_stock_count_distribution


class StockPortfolioCountDistributionItemSerializer(Serializer):
    name = CharField()
    count = IntegerField()


class StockPortfolioCountDistributionSerializer(Serializer):
    count_distributions = StockPortfolioCountDistributionItemSerializer(
        many=True,
        read_only=True
    )

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')
        return super().__init__(*args, **kwargs)

    def validate(self, data):
        count_distributions = get_stock_count_distribution(self.user)
        print(count_distributions)
        data['count_distributions'] = count_distributions
        return data
