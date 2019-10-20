from stock.models import StockTx


def get_stock_tx_net_value(gross_value, trade_cost, tx_type):
    if tx_type == StockTx.TX_BUY[0]:
        return gross_value + trade_cost
    else:  # TX_SELL & TX_DIVIDEND
        return gross_value - trade_cost
