from datetime import date, datetime, timedelta
from lxml import html

import requests


def get_notice_url(stock_code, url_idx):
    end_date, start_date = date.today(), date.today() - timedelta(days=365)
    start_date = start_date.strftime('%d/%m/%Y')
    end_date = end_date.strftime('%d/%m/%Y')

    url = 'https://di.hkex.com.hk/di/NSSrchCorpList.aspx?sa1=cl&' +\
        f'scsd={start_date}&sced={end_date}&' +\
        f'sc={stock_code}&src=MAIN&lang=EN'

    res = requests.get(url=url)
    lxml_html = html.fromstring(res.text)
    table = lxml_html.find('.//table[@id="grdPaging"]')
    trow = table.findall('.//tr')[1]
    tdata = trow.findall('.//td')[2]
    anchor = tdata.findall('.//a')[url_idx]
    href = anchor.attrib['href']
    url = f'https://di.hkex.com.hk/di/{href}'
    return url
