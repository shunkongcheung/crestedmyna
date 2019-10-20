from datetime import datetime
from lxml import html
import requests


def get_lxml_from_stock_code(stock_code, date):
    url = 'https://www.hkexnews.hk/sdw/search/searchsdw.aspx'
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    today = datetime.now().strftime('%Y%m%d')
    tx_shareholding_date = date.strftime('%Y/%m/%d')
    data = {
        '__EVENTTARGET': 'btnSearch',
        'today': today,
        'sortBy': 'shareholding',
        'sortDirection': 'desc',
        # 'txtStockCode': '00066',
        # 'txtShareholdingDate': '2019/09/27',
        'txtStockCode': stock_code,
        'txtShareholdingDate': tx_shareholding_date,
    }
    res = requests.post(url, data)
    status_code, payload = res.status_code, res.text
    if not status_code == 200:
        return None

    return html.fromstring(payload)
