from base.serializers import MyBaseSerializer

from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (
    CharField,
    IntegerField,
    ModelSerializer,
    Serializer
)

from .utils import (
    get_stock_info,
    get_stock_last_price,

)


class StockMasterSerializer(MyBaseSerializer):
    def validate(self, data):
        stock_code = data['stock_code']
        try:
            stock_info = get_stock_info(stock_code)
            data['name'] = stock_info['name']
        except Exception as ex:
            raise ValidationError(str(ex))

        try:
            last_price = get_stock_last_price(stock_code)
            data['market_price'] = last_price
        except Exception as ex:
            raise ValidationError(str(ex))

        return data

    def update(self, instance, data):
        data['market_value'] = data['market_price'] * instance.share_count
        return super().update(instance, data)

    def create(self, data):
        stock_master, created = self.Meta.model.objects.update_or_create(
            created_by=data['created_by'],
            stock_code=data['stock_code'],
            defaults=data
        )
        return stock_master
