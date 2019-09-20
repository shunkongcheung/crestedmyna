from rest_framework.serializers import (
    CharField,
    DateField,
    FloatField,
    Serializer,
)

from .utils import get_stock_prices


class StockPriceItemSerializer(Serializer):
    nominal_price = FloatField()
    date = DateField()


class StockPriceSerializer(Serializer):
    prices = StockPriceItemSerializer(many=True, read_only=True)

    start_date = DateField()
    end_date = DateField()
    stock_code = CharField()

    def validate(self, data):
        start_date = data['start_date']
        end_date = data['end_date']
        stock_code = data['stock_code']

        prices = get_stock_prices(start_date, end_date, stock_code)
        data['prices'] = prices
        return data
