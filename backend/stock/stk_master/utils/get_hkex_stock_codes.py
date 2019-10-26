from io import BytesIO
from zipfile import ZipFile

from general.gnl_lookup.utils import get_lookup_value

import pandas as pd
import requests


def get_hkex_stock_codes():
    api_key = get_lookup_value('STOCK_API_KEY')
    url = f'https://www.quandl.com/api/v3/databases/HKEX/metadata?api_key={api_key}'
    response = requests.get(url=url)
    zipfile = ZipFile(BytesIO(response.content))
    df = pd.read_csv(BytesIO(zipfile.read('HKEX_metadata.csv')))
    return df['code']
