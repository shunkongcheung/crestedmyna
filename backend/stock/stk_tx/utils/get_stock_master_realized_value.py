from django.db.models import Sum

from stock.models import StockTx
from .get_stock_tx_basic_filter import get_stock_tx_basic_filter
from .get_stock_master_share_count_by_type import get_stock_master_share_count_by_type


def get_stock_master_sold_net_value(stock_master, tx_after, tx_before):
    kwargs = get_stock_tx_basic_filter(StockTx.TX_SELL[0],
                                       tx_after,
                                       tx_before
                                       )

    return stock_master.stock_txs.filter(**kwargs)\
        .aggregate(Sum('net_value'))['net_value__sum'] or 0


def get_stock_master_dividend_net_value(stock_master, tx_after, tx_before):
    kwargs = get_stock_tx_basic_filter(StockTx.TX_DIVIDEND[0],
                                       tx_after,
                                       tx_before
                                       )

    return stock_master.stock_txs.filter(**kwargs)\
        .aggregate(Sum('net_value'))['net_value__sum'] or 0


def get_stock_master_realized_buy_net_value(stock_master,
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

    realized_buy_net_value = 0.0
    for buy_tx in buy_txs:
        if sell_share_count <= 0:
            return realized_buy_net_value

        if buy_tx.share_count > sell_share_count:
            porata_buy_net_value = buy_tx.net_value / buy_tx.share_count * sell_share_count
            return realized_buy_net_value + porata_buy_net_value

        sell_share_count -= buy_tx.share_count
        realized_buy_net_value += buy_tx.net_value

    return realized_buy_net_value


def get_stock_master_realized_value(stock_master,
                                    tx_after=None,
                                    tx_before=None):
    sell_share_count = get_stock_master_share_count_by_type(stock_master,
                                                            StockTx.TX_SELL[0],
                                                            tx_after,
                                                            tx_before
                                                            )
    sell_net_value = get_stock_master_sold_net_value(stock_master,
                                                     tx_after,
                                                     tx_before
                                                     )
    buy_net_value = get_stock_master_realized_buy_net_value(stock_master,
                                                            sell_share_count,
                                                            tx_after,
                                                            tx_before
                                                            )
    dividend_net_value = get_stock_master_dividend_net_value(stock_master,
                                                             tx_after,
                                                             tx_before
                                                             )
    return dividend_net_value + sell_net_value - buy_net_value
