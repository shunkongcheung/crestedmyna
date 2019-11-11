from rest_framework.serializers import (
    CharField,
    DateField,
    FloatField,
    Serializer,
    URLField,
)


class StockNoticeShareHolderSerializer(Serializer):
    form_serial_url = URLField()
    form_serial_number = CharField()
    shareholder_name = CharField()
    share_count = FloatField()
    share_percent = FloatField()
    notice_date = DateField()
