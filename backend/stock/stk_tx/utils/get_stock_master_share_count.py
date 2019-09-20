from stock.models import StockTx
from .get_stock_master_share_count_by_type import get_stock_master_share_count_by_type


def get_stock_master_share_count(stock_master,
                                 tx_after=None,
                                 tx_before=None):
    buy_share_count = get_stock_master_share_count_by_type(stock_master,
                                                           StockTx.TX_BUY[0],
                                                           tx_after,
                                                           tx_before
                                                           )
    sell_share_count = get_stock_master_share_count_by_type(stock_master,
                                                            StockTx.TX_SELL[0],
                                                            tx_after,
                                                            tx_before
                                                            )
    return buy_share_count - sell_share_count
