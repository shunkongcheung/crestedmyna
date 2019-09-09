from django.db.models import Sum
from base.serializers import MyBaseSerializer
from .utils import (
    get_stock_master_realized_value,
    get_stock_master_share_count,
    get_stock_master_total_value,
    get_stock_tx_gross_value,
    get_stock_tx_net_value,
    get_stock_tx_trade_cost,
)


class StockTxSerializer(MyBaseSerializer):
    def validate(self, data):
        # props
        share_count, price = data['share_count'], data['price']
        stock_code = data['stock_master'].stock_code
        tx_type = data['tx_type']

        # calculation
        gross_value = get_stock_tx_gross_value(share_count, price)
        trade_cost = get_stock_tx_trade_cost(gross_value)
        net_value = get_stock_tx_net_value(gross_value, trade_cost, tx_type)

        name = f'{stock_code} tx'

        # set back
        data['gross_value'], data['trade_cost'] = gross_value, trade_cost
        data['name'], data['net_value'] = name, net_value

        # finish
        return data

    def save(self):
        ret = super(StockTxSerializer, self).save()
        stock_master = ret.stock_master
        stock_master.share_count = get_stock_master_share_count(stock_master)
        stock_master.total_value = get_stock_master_total_value(stock_master)
        stock_master.realized_value = \
            get_stock_master_realized_value(stock_master)

        stock_master.save()
        return ret
