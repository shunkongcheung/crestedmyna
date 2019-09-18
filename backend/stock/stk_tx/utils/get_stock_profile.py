from stock.models import StockProfile


def get_stock_profile(user):
    return StockProfile.objects.get(created_by=user, enable=True)
