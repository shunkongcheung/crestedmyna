from stock.stk_master.utils import get_stock_last_status
from stock.stk_ccass.utils import get_lxml_from_stock_code


def get_stock_ccass_and_price(stock_code, date):
    nominal_price, turnover = get_stock_last_status(stock_code, date)
    participant_pecent = get_stock_participant_percent(stock_code, date)
    return participant_pecent, nominal_price, turnover


def get_stock_participant_percent(stock_code, date):
    html_lxml = get_lxml_from_stock_code(stock_code, date)
    parent_item = html_lxml.xpath('//div[@class="percent-of-participants"]')[1]
    percent_text = parent_item.xpath('.//div[@class="value"]')[0].text
    participant_pecent = float(percent_text.replace('%', ''))
    return participant_pecent
