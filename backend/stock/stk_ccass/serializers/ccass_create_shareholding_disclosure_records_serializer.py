from rest_framework.serializers import (
    CharField,
    DateTimeField,
    Serializer,
)


from ..tasks import create_shareholding_disclosure_records


class CCASSCreateStockHoldingDisclosureRecordsSerializer(Serializer):
    stock_code = CharField()
    date = DateTimeField()

    def validate(self, data):
        stock_code = data['stock_code']
        date_string = data['date'].strftime("%Y-%m-%dT%H:%M:%SZ")
        create_shareholding_disclosure_records(stock_code, date_string)
        return data
