from ..models import StockTx


def get_stock_tx_trade_cost(gross_value, stock_profile, trade_type):
    static_cost = stock_profile.dividend_static_cost \
        if trade_type == StockTx.TX_DIVIDEND[0]\
        else stock_profile.tx_static_cost

    proportion_ratio = stock_profile.dividend_proportion_cost \
        if trade_type == StockTx.TX_DIVIDEND[0]\
        else stock_profile.tx_proportion_cost

    proportion_cost = proportion_ratio * gross_value
    return static_cost + proportion_cost
