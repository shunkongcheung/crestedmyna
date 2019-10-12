import json
import pandas as pd
import requests
import re


def get_stock_code_from_name(stock_name):
    match = re.search(r'\((.*?)\)', stock_name)
    return match.group(1) if match else ''


def get_stock_codes():
    df = pd.read_csv('~/Desktop/HKEX_metadata.csv')
    df['stock_code'] = df['name'].apply(get_stock_code_from_name)
    return df['stock_code']


def request_to_backend(stock_code):
    headers = {'Content-Type': 'application/json', 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjAyMzk1NTM1LCJlbWFpbCI6InNodW5rb25nLmNoZXVuZ0BnbWFpbC5jb20iLCJvcmlnX2lhdCI6MTU3MDg1OTUzNSwiZmlyc3RfbmFtZSI6IiIsImxhc3RfbmFtZSI6IiJ9.Wg5Lyid9uyvG7TcHYJGnk7q1Mv00FfaPnWFBVi8LbHs'}
    url = 'https://www.crestedmyna.com/api/stock/stk_master/create/'
    data = {'stock_code': stock_code}
    response = requests.post(url=url, headers=headers, data=json.dumps(data))
    return response.status_code == 201


if __name__ == '__main__':
    start_idx = 170
    stock_codes = get_stock_codes()
    stock_code = stock_codes[1]
    total = len(stock_codes)

    for idx, stock_code in enumerate(stock_codes):
        if idx < start_idx:
            continue

        try:
            okay = request_to_backend(stock_code)
        except:
            okay = False
        print(f'{idx}/{total}: {stock_code} --- {okay}')
