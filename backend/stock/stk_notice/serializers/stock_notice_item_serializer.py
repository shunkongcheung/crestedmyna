from rest_framework.serializers import (
    BooleanField,
    CharField,
    DateField,
    FloatField,
    Serializer,
    URLField,
)


class StockNoticeItemSerializer(Serializer):
    form_serial_url = URLField()
    form_serial_number = CharField()
    shareholder_name = CharField()
    reason_for_disclosure = CharField()
    share_count = FloatField()
    average_price = FloatField()
    interested_share = FloatField()
    share_percent = FloatField()
    notice_date = DateField()
    is_associated = BooleanField()
    is_debentures = BooleanField()
