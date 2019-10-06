from django.db.models import Sum
from stock.models import StockMaster


def get_portfolio_summary(user, sector=None):
    stock_masters = get_stock_masters(user, sector)

    market_value = get_market_value(stock_masters)
    realized_value = get_realized_value(stock_masters)
    share_count = get_share_count(stock_masters)
    unrealized_value = get_unrealized_value(stock_masters)

    return {
        'market_value': market_value,
        'realized_value': realized_value,
        'share_count': share_count,
        'unrealized_value': unrealized_value,
    }


def get_market_value(stock_masters):
    return stock_masters\
        .values('market_value')\
        .aggregate(sum=Sum('market_value'))['sum']


def get_realized_value(stock_masters):
    return stock_masters\
        .values('realized_value')\
        .aggregate(sum=Sum('realized_value'))['sum']


def get_share_count(stock_masters):
    return stock_masters\
        .values('share_count')\
        .aggregate(sum=Sum('share_count'))['sum']


def get_unrealized_value(stock_masters):
    return stock_masters\
        .values('unrealized_value')\
        .aggregate(sum=Sum('unrealized_value'))['sum']


def get_stock_masters(user, sector):
    stock_masters = StockMaster.objects\
        .filter(enable=True, created_by=user)
    if not sector is None:
        stock_masters = stock_masters.filter(sector=sector)

    return stock_masters
