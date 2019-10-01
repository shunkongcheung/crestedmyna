from __future__ import absolute_import, unicode_literals
from celery import shared_task

from base.utils import get_admin_user
from general.gnl_syslog.utils import write_syslog
from stock.models import (
    CCASSParticipantMaster,
    CCASSParticipantDetail,
)

from datetime import datetime
from lxml import html

import requests


@shared_task
def create_shareholding_disclosure_records(stock_code, date_string):
    date = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%SZ")
    date_string = date.strftime('%Y/%m/%d')
    lxml_html = get_lxml_from_stock_code(stock_code, date_string)

    try:
        trows = get_all_trows_from_lxml(lxml_html)
    except AttributeError:
        w_debug(
            f'no data were found for stock code {stock_code} on {date_string}')
        return

    admin_user, total_len = get_admin_user(), len(trows)
    w_debug(f'[{date_string}] {stock_code}: total {total_len}')

    for idx, trow in enumerate(trows):
        row_content = get_content_from_trow(trow)
        if row_content is None:
            w_debug(f'[{date_string}] {stock_code}: {idx}/{total_len}: is none')
            continue

        p_master, _ = create_or_update_partipant_master(
            row_content['address'],
            row_content['participant_id'],
            row_content['participant_name'],
            admin_user
        )
        _, created = create_partipiant_detail(date,
                                              p_master,
                                              row_content['share_count'],
                                              row_content['share_percent'],
                                              stock_code,
                                              admin_user
                                              )

        w_debug(f'[{date_string}] {stock_code}: {idx}/{total_len}: {created}')


def create_partipiant_detail(detail_date,
                             participant_master,
                             share_count,
                             share_percent,
                             stock_code,
                             user
                             ):
    defaults = {'name': f'{stock_code} {participant_master.name}',
                'share_count': share_count,
                'share_percent': share_percent,
                'created_by': user,
                }
    p_detail, created = CCASSParticipantDetail.objects\
        .update_or_create(
            stock_code=stock_code,
            detail_date=detail_date,
            participant_master=participant_master,
            defaults=defaults
        )
    return p_detail, 'created' if created else 'exist'


def create_or_update_partipant_master(address,
                                      participant_id,
                                      participant_name,
                                      user):

    defaults = {
        'address': address,
        'created_by': user,
    }
    p_master, created = CCASSParticipantMaster.objects\
        .update_or_create(
            participant_id=participant_id,
            name=participant_name,
            defaults=defaults
        )

    return p_master, 'created' if created else 'exist'


def get_stripped_data(data):
    try:
        return data.replace(',', '').replace(':', '').replace('%', '').strip()
    except:
        return 'EMPTY'


def get_content_from_trow(trow):
    is_contain_data = False
    content = {
        'participant_id': 'No ID provided',
        'participant_name': 'No name provided',
        'address': 'No address provided',
        'share_count': 0,
        'share_percent': 0,
    }
    for tdata in trow.findall('.//td'):
        [name_div, data_div] = list(tdata)
        name = get_stripped_data(name_div.text)
        value = get_stripped_data(data_div.text)

        if value == 'EMPTY':
            continue

        if 'Address' in name:
            content['address'] = value
        elif 'Shareholding' in name:
            content['share_count'] = float(value)
        elif 'Participant ID' in name:
            content['participant_id'] = value
        elif 'of the total number of Issued Shares/ Warrants/ Units' in name:
            content['share_percent'] = float(value)
        elif 'Name of CCASS Participant' in name:
            content['participant_name'] = value

        is_contain_data = True

    return content if is_contain_data else None


def get_all_trows_from_lxml(lxml_html):
    table = lxml_html.find('.//table')
    tbody = table.find('.//tbody')
    return tbody.findall('.//tr')


def get_lxml_from_stock_code(stock_code, date):
    url = 'https://www.hkexnews.hk/sdw/search/searchsdw.aspx'
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    today = datetime.now().strftime('%Y%m%d')
    data = {
        '__EVENTTARGET': 'btnSearch',
        'today': today,
        'sortBy': 'shareholding',
        'sortDirection': 'desc',
        # 'txtStockCode': '00066',
        # 'txtShareholdingDate': '2019/09/27',
        'txtStockCode': stock_code,
        'txtShareholdingDate': date,
    }
    res = requests.post(url, data)
    status_code, payload = res.status_code, res.text
    if not status_code == 200:
        return None

    return html.fromstring(payload)


def w_debug(message):
    admin_user, name = get_admin_user(), 'create_shareholding_disclosure_records'
    return write_syslog(name, message, admin_user)
