from stock.models import StockTx
from .get_stock_master_share_count_by_type import get_stock_master_share_count_by_type


def get_stock_master_share_count(stock_master,
                                 created_after=None,
                                 created_before=None):
    buy_share_count = get_stock_master_share_count_by_type(stock_master,
                                                           StockTx.TX_BUY[0],
                                                           created_after,
                                                           created_before
                                                           )
    sell_share_count = get_stock_master_share_count_by_type(stock_master,
                                                            StockTx.TX_SELL[0],
                                                            created_after,
                                                            created_before
                                                            )
    return buy_share_count - sell_share_count
