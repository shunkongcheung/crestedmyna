from datetime import date, datetime, timedelta
from lxml import html

import requests


def get_notice_list(stock_code):
    notice_html = get_notice_html(stock_code)
    notice_data = get_notice_data_from_html(notice_html)
    return notice_data


def get_notice_data_from_trow(trow):
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
        data['reason_for_disclosure'] = trow[2][0].text
    except:
        data['reason_for_disclosure'] = ''

    try:
        data['share_count'] = get_number_from_string(trow[3].text)
    except:
        data['share_count'] = -1

    try:
        price_text = trow[4].text.replace('HKD ', '')
        data['average_price'] = get_number_from_string(price_text)
    except:
        data['average_price'] = -1

    try:
        data['interested_share'] = get_number_from_string(trow[5].text)
    except:
        data['interested_share'] = -1
    try:
        data['share_percent'] = get_number_from_string(trow[6].text)
    except:
        data['share_percent'] = -1

    try:
        data['notice_date'] = datetime\
            .strptime(trow[7][0].text, '%d/%m/%Y')\
            .date()
    except:
        data['notice_date'] = datetime.now().date()

    try:
        data['is_associated'] = trow[8][0].text == 'Yes'
    except:
        data['is_associated'] = False

    try:
        data['is_debentures'] = trow[9][0].text == 'Yes'
    except:
        data['is_debentures'] = False

    return data


def get_number_from_string(text):
    l_replaced = text.replace('(L)', '')
    dot_replaced = l_replaced.replace(',', '')
    return float(dot_replaced)


def get_url_from_text(text):
    return f'https://di.hkex.com.hk/di/{text}'


def get_notice_data_from_html(notice_html):
    lxml_html = html.fromstring(notice_html)
    table = lxml_html.find('.//table[@id="grdPaging"]')
    trows = table.findall('.//tr')
    notice_data = []
    for trow in trows[1:]:
        data = get_notice_data_from_trow(trow)
        if data:
            notice_data.append(data)
    return notice_data


def get_notice_html(stock_code):
    end_date, start_date = date.today(), date.today() - timedelta(days=365)

    start_date = start_date.strftime('%d/%m/%Y')
    end_date = end_date.strftime('%d/%m/%Y')
    url = 'https://di.hkex.com.hk/di/NSAllFormList.aspx?' +\
        f'sa2=an&sid=1&sd={start_date}&ed={end_date}&cid=0' +\
        f'&sa1=cl&scsd={start_date}&sced={end_date}&sc={stock_code}' +\
        '&src=MAIN&lang=EN&'

    res = requests.get(url=url)
    return res.text
