from stock.utils.get_quandl import get_quandl


def get_stock_info(stock_code):
    quandl = get_quandl()
    stock = f'HKEX/{stock_code}'
    try:
        d = quandl.Dataset(stock)
        return {'name': d.name, }
    except quandl.errors.quandl_error.NotFoundError:
        raise Exception('Invalid stock code.')
