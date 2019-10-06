from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (
    CharField,
    IntegerField,
    ModelSerializer,
    PrimaryKeyRelatedField,
    Serializer,
)

from base.serializers import MyBaseSerializer

from stock.models import StockSectorMaster

from .utils import (
    get_stock_info,
    get_stock_last_status,
)


class StockMasterSerializer(MyBaseSerializer):
    sector = PrimaryKeyRelatedField(
        required=False,
        queryset=StockSectorMaster.objects.filter(enable=True),
    )

    def validate(self, data):
        defualt_sector = StockSectorMaster.objects\
            .get(name='Undetermined', enable=True)
        stock_code = data['stock_code']
        try:
            stock_info = get_stock_info(stock_code)
            data['name'] = stock_info['name']
        except Exception as ex:
            raise ValidationError(str(ex))

        try:
            last_price, turnover = get_stock_last_status(stock_code)
            data['market_price'] = last_price
            data['turnover'] = turnover
        except Exception as ex:
            raise ValidationError(str(ex))

        sector = data.get('sector', defualt_sector)
        data['sector'] = sector

        return data

    # def update(self, instance, data):
    #     data['market_value'] = data['market_price'] * instance.share_count
    #     return super().update(instance, data)

    def create(self, data):
        stock_master, created = self.Meta.model.objects.update_or_create(
            created_by=data['created_by'],
            stock_code=data['stock_code'],
            enable=True,
            defaults=data
        )
        return stock_master
