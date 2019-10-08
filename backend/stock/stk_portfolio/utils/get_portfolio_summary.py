from django.db.models import Sum
from stock.models import StockMaster


def get_portfolio_summary(user, sectors):
    stock_masters = get_stock_masters(user, sectors)

    market_value = get_market_value(stock_masters)
    realized_value = get_realized_value(stock_masters)
    unrealized_value = get_unrealized_value(stock_masters)

    return {
        'market_value': market_value,
        'realized_value': realized_value,
        'unrealized_value': unrealized_value,
    }


def get_market_value(stock_masters):
    return stock_masters\
        .values('market_value')\
        .aggregate(sum=Sum('market_value'))['sum'] or 0


def get_realized_value(stock_masters):
    return stock_masters\
        .values('realized_value')\
        .aggregate(sum=Sum('realized_value'))['sum'] or 0


def get_unrealized_value(stock_masters):
    return stock_masters\
        .values('unrealized_value')\
        .aggregate(sum=Sum('unrealized_value'))['sum'] or 0


def get_stock_masters(user, sectors):
    stock_masters = StockMaster.objects\
        .filter(enable=True, created_by=user)
    if sectors:
        stock_masters = stock_masters.filter(sector__in=sectors)

    return stock_masters
