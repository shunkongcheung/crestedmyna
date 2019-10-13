from stock.utils.get_quandl import get_quandl
import json


def get_stock_trends(start_date, end_date, stock_code):
    quandl, stock = get_quandl(), f'HKEX/{stock_code}'
    data = quandl.get(stock, start_date=start_date, end_date=end_date)

    columns = {
        'Nominal Price': 'nominal_price',
        # 'Turnover (000)': 'turnover',
        'Share Volume (000)': 'turnover',
    }
    data = data.rename(columns=columns)
    data.index.name = 'date'

    json_str = data.to_json(orient='table', index=True)
    trends = json.loads(json_str)['data']

    return trends
