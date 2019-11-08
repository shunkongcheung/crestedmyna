from lxml import html

import requests


def get_realtime_stock_price(stock_code):
    stock_code = ''.join(stock_code[1:])
    url = f'https://query1.finance.yahoo.com/v8/finance/chart/{stock_code}.HK?region=HK&lang=zh-Hant-HK&includePrePost=false&interval=1m&range=1d&corsDomain=hk.finance.yahoo.com&.tsrc=finance'
    res = requests.get(url)
    status_code = res.status_code
    if not status_code == 200:
        return None
    payload = res.json()
    stock_price = payload['chart']['result'][0]['meta']['chartPreviousClose']
    return stock_price
