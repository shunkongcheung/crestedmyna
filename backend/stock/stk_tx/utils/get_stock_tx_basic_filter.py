def get_stock_tx_basic_filter(tx_type, tx_before, tx_after):
    kwargs = {'tx_type': tx_type, 'enable': True}
    if tx_after:
        kwargs['tx_at__gte'] = tx_after
    if tx_before:
        kwargs['tx_at__lt'] = tx_before
    return kwargs
