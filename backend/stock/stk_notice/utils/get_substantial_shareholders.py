from datetime import date, datetime, timedelta
from lxml import html

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


def get_shareholder_data_from_html(shareholder_html):
    lxml_html = html.fromstring(shareholder_html)
    table = lxml_html.find('.//table[@class="txt"]')
    trows = table.findall('.//tr')

    shareholder_data = []
    for trow in trows[1:]:
        data = {}
        data['href'] = get_url_from_text(trow[0][0].attrib['href'])
        data['shareholder_name'] = trow[1].text
        data['share_count'] = get_number_from_string(trow[2].text)
        data['share_percent'] = get_number_from_string(trow[3].text)
        data['notice_date'] = datetime\
            .strptime(trow[4][0].text, '%d/%m/%Y')\
            .date()
        shareholder_data.append(data)
    return shareholder_data


def get_shareholder_html(stock_code):
    end_date, start_date = date.today(), date.today() - timedelta(days=365)

    start_date = start_date.strftime('%d/%m/%Y')
    end_date = end_date.strftime('%d/%m/%Y')

    url = 'https://di.hkex.com.hk/di/NSConstdSSList.aspx?' +\
        f'sa2=cs&sid={stock_code}&sd={start_date}&ed={end_date}&cid=0' + \
        f'&sa1=cl&scsd={start_date}&sced={end_date}&sc={stock_code}&src=MAIN&lang=EN&'

    res = requests.get(url=url)
    return res.text
