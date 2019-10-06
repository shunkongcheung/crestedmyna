from django.db.models import Sum

from stock.models import StockTx
from .get_stock_tx_basic_filter import get_stock_tx_basic_filter
from .get_stock_master_share_count_by_type import get_stock_master_share_count_by_type
from .get_stock_master_realized_value import get_stock_master_realized_buy_net_value


def get_stock_master_unrealized_buy_net_value(stock_master,
                                              sell_share_count,
                                              tx_after,
                                              tx_before):
    kwargs = get_stock_tx_basic_filter(StockTx.TX_BUY[0],
                                       tx_after,
                                       tx_before
                                       )
    buy_txs = stock_master.stock_txs.filter(stock_master=stock_master,
                                            **kwargs
                                            )

    buy_tx_total_value = buy_txs\
        .aggregate(Sum('net_value'))['net_value__sum'] or 0

    realized_buy_net_value = get_stock_master_realized_buy_net_value(
        stock_master,
        sell_share_count,
        tx_after,
        tx_before
    )
    unrealized_buy_net_value = buy_tx_total_value - realized_buy_net_value
    return unrealized_buy_net_value


def get_stock_master_unrealized_cost(stock_master,
                                     tx_after=None,
                                     tx_before=None):
    sell_share_count = get_stock_master_share_count_by_type(stock_master,
                                                            StockTx.TX_SELL[0],
                                                            tx_after,
                                                            tx_before
                                                            )
    buy_net_value = get_stock_master_unrealized_buy_net_value(stock_master,
                                                              sell_share_count,
                                                              tx_after,
                                                              tx_before
                                                              )
    return buy_net_value
