from rest_framework.serializers import (
    CharField,
    Serializer,
)

from ..tasks import update_stock_master_market_price_and_value


class StockUpdateStockMasterMarketPriceAndValueSerializer(Serializer):
    stock_code = CharField()

    def validate(self, data):
        stock_code = data['stock_code']
        update_stock_master_market_price_and_value(stock_code)
        return data
