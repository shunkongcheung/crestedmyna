from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from stock.models import StockSectorMaster


def create_stock_sectors():
    stock_sectors = get_stock_sectors()
    total_len = len(stock_sectors)
    admin_user = get_admin_user()
    w_log(f'begin. total {total_len}')
    for idx, sector_data in enumerate(stock_sectors):
        created, obj = StockSectorMaster.objects\
            .get_or_create(created_by=admin_user, **sector_data)
        created = 'created' if created else 'existed'
        name = sector_data['name']
        message = f'{idx}/{total_len}: {name} {created}'
        w_log(message)


def get_stock_sectors():
    return [
        {'name': 'Financials'},
        {'name': 'Information Technology'},
        {'name': 'Health Care'},
        {'name': 'Consumer Staples'},
        {'name': 'Utilities'},
        {'name': 'Communication Services'},
        {'name': 'Industrials'},
        {'name': 'Consumer Discretionary'},
        {'name': 'Energy'},
        {'name': 'Real Estate'},
        {'name': 'Materials'},
        {'name': 'Undetermined'},
    ]


def w_log(message):
    user = get_admin_user()
    write_syslog('create_stock_sectors', message, user)
