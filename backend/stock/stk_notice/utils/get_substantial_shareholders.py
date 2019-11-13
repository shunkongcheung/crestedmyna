from datetime import datetime
from lxml import html

from .get_notice_url import get_notice_url

import requests


def get_substantial_shareholders(stock_code):
    shareholder_html = get_shareholder_html(stock_code)
    shareholder_data = get_shareholder_data_from_html(shareholder_html)
    return shareholder_data


def get_number_from_string(text):
    l_replaced = text.replace('(L)', '')
    dot_replaced = l_replaced.replace(',', '')
    return float(dot_replaced)


def get_url_from_text(text):
    return f'https://di.hkex.com.hk/di/{text}'


def get_shareholder_data_from_trow(trow):
    data = {}
    try:
        data['form_serial_url'] = get_url_from_text(trow[0][0].attrib['href'])
    except:
        data['form_serial_url'] = ''
    try:
        data['form_serial_number'] = trow[0][0].text
    except:
        data['form_serial_number'] = ''

    try:
        data['shareholder_name'] = trow[1].text
    except:
        data['shareholder_name'] = ''

    try:
        data['share_count'] = get_number_from_string(trow[2].text)
    except:
        data['share_count'] = -1

    try:
        data['share_percent'] = get_number_from_string(trow[3].text)
    except:
        data['share_percent'] = -1

    try:
        data['notice_date'] = datetime\
            .strptime(trow[4][0].text, '%d/%m/%Y')\
            .date()
    except:
        data['notice_date'] = datetime.now().date()

    return data


def get_shareholder_data_from_html(shareholder_html):
    lxml_html = html.fromstring(shareholder_html)
    table = lxml_html.find('.//table[@id="grdPaging"]')
    trows = table.findall('.//tr')

    shareholder_data = []
    for trow in trows[1:]:
        data = get_shareholder_data_from_trow(trow)
        if data:
            shareholder_data.append(data)
    return shareholder_data


def get_shareholder_html(stock_code):
    url = get_notice_url(stock_code, url_idx=1)
    res = requests.get(url=url)
    return res.text
