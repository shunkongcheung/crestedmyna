from django.db.models import Count, F, Q, Sum
from stock.models import StockMaster, StockSectorMaster


def get_stock_distribution(user):
    count_distribution = get_stock_count_distribution(user)
    mv_distribution = get_stock_market_value_distribution(user)
    rv_distribution = get_stock_realized_value_distribution(user)
    uv_distribution = get_stock_unrealized_value_distribution(user)

    return {
        'count_distributions': count_distribution,
        'market_value_distributions': mv_distribution,
        'realized_value_distributions': rv_distribution,
        'unrealized_value_distributions': uv_distribution,
    }


def get_user_stock_masters(user):
    stock_master_filter = Q(enable=True, created_by=user)
    stock_masters = StockMaster.objects.filter(stock_master_filter)
    return stock_masters.annotate(sector_name=F('sector__name'))


def get_stock_count_distribution(user):
    stock_masters = get_user_stock_masters(user)
    return stock_masters.values('sector_name', 'sector', 'id')\
        .values('sector_name', 'sector')\
        .annotate(value=Count('sector_name'))


def get_stock_market_value_distribution(user):
    stock_masters = get_user_stock_masters(user)
    return stock_masters.values('sector_name', 'sector', 'market_value')\
        .values('sector_name', 'sector')\
        .annotate(value=Sum('market_value'))


def get_stock_realized_value_distribution(user):
    stock_masters = get_user_stock_masters(user)
    return stock_masters.values('sector_name', 'sector', 'realized_value')\
        .values('sector_name', 'sector')\
        .annotate(value=Sum('realized_value'))


def get_stock_unrealized_value_distribution(user):
    stock_masters = get_user_stock_masters(user)
    return stock_masters.values('sector_name', 'sector', 'unrealized_value')\
        .values('sector_name', 'sector')\
        .annotate(value=Sum('unrealized_value'))
