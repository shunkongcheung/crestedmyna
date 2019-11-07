from rest_framework.serializers import (
    CharField,
    FloatField,
    Serializer,
)

from .tasks import send_alert_emails


class StockAlertSendAlertEmailsSerializer(Serializer):
    stock_code = CharField()
    market_price = FloatField()
    ccass_percent = FloatField()

    def validate(self, data):
        stock_code, market_price, ccass_percent = \
            data['stock_code'], data['market_price'], data['ccass_percent']
        send_alert_emails(stock_code, market_price, ccass_percent)
