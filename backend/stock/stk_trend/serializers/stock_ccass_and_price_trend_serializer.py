from rest_framework.serializers import (
    CharField,
    FloatField,
    Serializer,
)


class StockCCASSAndPriceTrendSerializer(Serializer):
    stock_code = CharField()
    stock_name = CharField()

    diff_percent = FloatField()
    first_percent = FloatField()
    second_percent = FloatField()

    diff_turnover = FloatField()
    first_turnover = FloatField()
    second_turnover = FloatField()
