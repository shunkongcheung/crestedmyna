from django.db.models import Sum

from .get_stock_tx_basic_filter import get_stock_tx_basic_filter


def get_stock_master_share_count_by_type(stock_master,
                                         tx_type,
                                         tx_after,
                                         tx_before):
    kwargs = get_stock_tx_basic_filter(tx_type, tx_after, tx_before)
    return stock_master.stock_txs.filter(**kwargs)\
        .aggregate(Sum('share_count'))['share_count__sum'] or 0
