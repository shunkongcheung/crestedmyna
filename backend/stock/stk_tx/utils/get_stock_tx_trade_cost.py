def get_stock_tx_trade_cost(gross_value, stock_profile):
    static_cost = stock_profile.tx_static_cost
    proportion_cost = stock_profile.tx_proportion_cost * gross_value
    return static_cost + proportion_cost
