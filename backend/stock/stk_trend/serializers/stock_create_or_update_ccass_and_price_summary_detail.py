from rest_framework.serializers import (
    CharField,
    DateField,
    FloatField,
    Serializer,
)

from ..tasks import create_or_update_ccass_and_price_summary_detail


class StockCreateOrUpdateCCASSAndPriceSummaryDetailSerializer(Serializer):
    stock_code = CharField()
    date = DateField()

    def validate(self, data):
        stock_code, date = data['stock_code'], data['date']
        create_or_update_ccass_and_price_summary_detail(stock_code, date)
        return data
