from base.serializers import MyBaseSerializer
from .utils import (
    get_stock_master_realized_value,
    get_stock_master_share_count,
    get_stock_master_market_value,
    get_stock_master_unrealized_cost,
    get_stock_profile,
    get_stock_tx_gross_value,
    get_stock_tx_net_value,
    get_stock_tx_trade_cost,
)


class StockTxSerializer(MyBaseSerializer):
    # fields = ['stock_master', 'tx_type', 'share_count', 'price', ]

    def validate(self, data):
        # props
        share_count, price, tx_type = data['share_count'], data['price'], data['tx_type']
        stock_master = data['stock_master']
        stock_code = stock_master.stock_code
        stock_profile = get_stock_profile(stock_master.created_by)

        # calculation
        gross_value = get_stock_tx_gross_value(share_count, price)
        trade_cost = get_stock_tx_trade_cost(gross_value,
                                             stock_profile,
                                             tx_type
                                             )
        net_value = get_stock_tx_net_value(gross_value, trade_cost, tx_type)
        name = f'{stock_code} {share_count} {price}'

        # set back
        data['gross_value'], data['trade_cost'] = gross_value, trade_cost
        data['name'], data['net_value'] = name, net_value

        # finish
        return data

    def save(self):
        instance = super().save()

        # update master after save
        stock_master = instance.stock_master
        stock_master.share_count = get_stock_master_share_count(stock_master)

        market_value = get_stock_master_market_value(stock_master)
        stock_master.market_value = market_value

        realized_value = get_stock_master_realized_value(stock_master)
        stock_master.realized_value = realized_value

        unrealized_cost = get_stock_master_unrealized_cost(stock_master)
        stock_master.unrealized_cost = unrealized_cost
        stock_master.unrealized_value = market_value - unrealized_cost

        stock_master.save()
        return instance
