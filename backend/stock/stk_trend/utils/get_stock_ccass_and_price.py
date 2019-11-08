from stock.stk_master.utils import get_stock_last_status
from stock.stk_ccass.utils import get_lxml_from_stock_code


def get_stock_ccass_and_price(stock_code, date):
    nominal_price, turnover = get_stock_last_status(stock_code, date)

    html_lxml = get_lxml_from_stock_code(stock_code, date)
    participant_pecent = get_stock_participant_percent(html_lxml)
    participant_share = get_stock_participant_share(html_lxml)

    return participant_pecent, participant_share, nominal_price, turnover


def get_stock_participant_share(html_lxml):
    total_div_class = '//div[@class="ccass-search-datarow ccass-search-total"]'
    total_div = html_lxml.xpath(total_div_class)[0]

    parent_div_class = './/div[@class="shareholding"]'
    parent_item = total_div.xpath(parent_div_class)[0]

    value_div_class = './/div[@class="value"]'
    percent_text = parent_item.xpath(value_div_class)[0].text

    participant_share = float(percent_text.replace(',', ''))
    return participant_share


def get_stock_participant_percent(html_lxml):
    total_div_class = '//div[@class="ccass-search-datarow ccass-search-total"]'
    total_div = html_lxml.xpath(total_div_class)[0]

    parent_div_class = './/div[@class="percent-of-participants"]'
    parent_item = total_div.xpath(parent_div_class)[0]

    value_div_class = './/div[@class="value"]'
    percent_text = parent_item.xpath(value_div_class)[0].text

    participant_pecent = float(percent_text.replace('%', ''))
    return participant_pecent


def get_stock_participant_percent(html_lxml):
    total_div_class = '//div[@class="ccass-search-datarow ccass-search-total"]'
    total_div = html_lxml.xpath(total_div_class)[0]

    parent_div_class = './/div[@class="percent-of-participants"]'
    parent_item = total_div.xpath(parent_div_class)[0]

    value_div_class = './/div[@class="value"]'
    percent_text = parent_item.xpath(value_div_class)[0].text

    participant_pecent = float(percent_text.replace('%', ''))
    return participant_pecent
