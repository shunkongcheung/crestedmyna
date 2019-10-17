from dateutil import parser
from lxml import etree, html

from general.gnl_syslog.utils import write_syslog
from .get_stock_code_hkex_id import get_stock_code_hkex_id

import requests


def get_news_from_hkex(stock_code, from_date, to_date):
    html_text = get_html_from_hkex(stock_code, from_date, to_date)
    lxml_html = html.fromstring(html_text)

    try:
        trows = get_all_trows_from_lxml(lxml_html)
    except AttributeError:
        w_debug(f'{stock_code} has no news data')
        return []

    unodered_news = [get_content_from_trow(trow) for trow in trows]
    news = sorted(unodered_news,
                  key=lambda itm: itm['release_time'],
                  reverse=True
                  )
    return news


def get_all_trows_from_lxml(lxml_html):
    table = lxml_html.find('.//table')
    tbody = table.find('.//tbody')
    return tbody.findall('.//tr')


def get_content_from_trow(trow):
    content = {
        'release_time': '',
        'headline': '',
        'document_link': '',
    }
    try:
        content['release_time'] = get_content_release_time(trow)
    except Exception as ex:
        raise ex

    try:
        content['headline'] = get_content_headline(trow)
    except Exception as ex:
        raise ex

    try:
        content['document_link'] = get_content_doc_link(trow)
    except Exception as ex:
        raise ex

    return content


def get_content_release_time(trow):
    release_time_div = trow.xpath('.//td[@class="text-right release-time"]')[0]
    release_time = etree.tostring(release_time_div[0], encoding='unicode')\
        .split('</span>')[1]
    return parser.parse(release_time)


def get_content_headline(trow):
    headline = trow.xpath('.//div[@class="headline"]')[0]
    return headline.text


def get_content_doc_link(trow):
    doc_link = trow.xpath('.//div[@class="doc-link"]')[0][0]
    return 'https://www.hkexnews.hk' + doc_link.attrib['href']


def get_html_from_hkex(stock_code, from_date, to_date):
    url = 'https://www1.hkexnews.hk/search/titlesearch.xhtml'
    stock_id = get_stock_code_hkex_id(stock_code)
    params = {'lang': 'en'}
    data = {
        'lang': 'EN',
        'category': 0,
        'market': 'SEHK',
        'searchType': 0,
        'stockId': stock_id,
        'from': from_date.strftime('%Y%m%d'),
        'to': to_date.strftime('%Y%m%d'),
        'MB-Daterange': 0,
    }
    res = requests.post(url=url, params=params, data=data)
    html_text = res.text
    return html_text


def w_log(message):
    name = 'get_news_from_hkex'
    write_syslog(name, message)
