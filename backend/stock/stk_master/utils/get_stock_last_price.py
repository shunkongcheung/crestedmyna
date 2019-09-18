from datetime import datetime, timedelta

from .get_quandl import get_quandl

import json
import pandas as pd


def get_start_date_str():
    a_random_far_date = datetime.today() - timedelta(7)
    date_str = a_random_far_date.strftime("%Y-%m-%d")
    return date_str


def get_end_date_str():
    yesterday = datetime.today() - timedelta(1)
    ytd_str = yesterday.strftime("%Y-%m-%d")
    return ytd_str


def get_stock_last_price(stock_code):
    quandl = get_quandl()
    start_date, end_date = get_start_date_str(), get_end_date_str()
    stock = f'HKEX/{stock_code}'
    data = quandl.get(stock, start_date=start_date, end_date=end_date)

    last_record = data.tail(1)
    record_dict = json.loads(last_record.to_json(orient='records'))[0]
    nominal_price = record_dict['Nominal Price']
    return nominal_price
