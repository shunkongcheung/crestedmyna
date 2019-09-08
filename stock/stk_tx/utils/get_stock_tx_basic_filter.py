def get_stock_tx_basic_filter(tx_type, created_before, created_after):
    kwargs = {'tx_type': tx_type, 'enable': True}
    if created_after:
        kwargs['created_at__gte'] = created_after
    if created_before:
        kwargs['created_at__lt'] = created_before
    return kwargs
