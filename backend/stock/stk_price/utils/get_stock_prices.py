from stock.utils.get_quandl import get_quandl
import json


def get_stock_prices(start_date, end_date, stock_code):
    quandl, stock = get_quandl(), f'HKEX/{stock_code}'
    data = quandl.get(stock, start_date=start_date, end_date=end_date)

    data = data.rename(columns={'Nominal Price': 'nominal_price', })
    data.index.name = 'date'

    json_str = data.to_json(orient='table', index=True)
    nominal_prices = json.loads(json_str)['data']

    return nominal_prices
