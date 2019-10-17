import json
import requests

from general.gnl_syslog.utils import write_syslog


def get_stock_code_hkex_id(stock_code):
    url = 'https://www1.hkexnews.hk/search/prefix.do'
    params = {
        'callback': 'callback',
        'lang': 'EN',
        'type': 'A',
        'name': stock_code,
        'market': 'SEHK',
        '_': '1571271032678',
    }
    res = requests.get(url=url, params=params)
    if res.status_code != 200:
        w_log(res.text)
        return -1

    payload = res.text
    payload = payload.replace('callback(', '').replace(');\n', '')
    payload = json.loads(payload)
    stock_info = payload['stockInfo']
    stock_id = stock_info[0]['stockId']
    return stock_id


def w_log(message):
    name = 'get_stock_code_hkex_id'
    write_syslog(name, message)
