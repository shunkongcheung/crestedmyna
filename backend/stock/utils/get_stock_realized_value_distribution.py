from django.db.models import Count, Q
from stock.models import StockSectorMaster


def get_stock_realized_value_distribution(user):
    stock_master_filter = Q(stock_masters__enable=True,
                            stock_masters__created_by=user
                            )
    stock_master_count = Count('stock_masters', stock_master_filter)
    return StockSectorMaster.objects\
        .annotate(count=stock_master_count)\
        .values('name', 'count')

