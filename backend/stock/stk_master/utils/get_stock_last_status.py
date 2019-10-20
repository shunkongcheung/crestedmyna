from datetime import datetime, timedelta
from stock.utils.get_quandl import get_quandl

import json


def get_start_date_str():
    a_random_far_date = datetime.today() - timedelta(7)
    date_str = a_random_far_date.strftime("%Y-%m-%d")
    return date_str


def get_end_date_str():
    yesterday = datetime.today() - timedelta(1)
    ytd_str = yesterday.strftime("%Y-%m-%d")
    return ytd_str


def get_stock_last_status(stock_code, date=None):
    quandl = get_quandl()
    start_date, end_date = get_start_date_str(), get_end_date_str()
    stock = f'HKEX/{stock_code}'
    data = quandl.get(stock, start_date=start_date, end_date=end_date)

    if date:
        d_index = data.index.get_loc(date)
        record_dict = data.iloc[d_index]
    else:
        target_record = data.tail(1)
        record_dict = json.loads(target_record.to_json(orient='records'))[0]

    nominal_price = record_dict['Nominal Price']
    turnover = record_dict['Share Volume (000)']
    return nominal_price, turnover
