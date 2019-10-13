import json
import argparse
import requests


def get_headers():
    token = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InNodW4uY2hldW5nIiwiZXhwIjoxNjAyMzkyMzQ5LCJlbWFpbCI6InNodW5rb25nY2hldW5nQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTcwODU2MzQ5LCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIn0.UVPcvyJp8euUz_rK2wjvD3s3GHOpFunSnFFblZgUvJ0'
    return {'Authorization': token, 'Content-Type': 'application/json', }


def fetch_data(url, data={}, method='GET'):
    headers = get_headers()
    url = f'http://localhost:7000/api/{url}/'
    res = requests.get(url=url, headers=headers)
    status_code = res.status_code
    payload = res.json()
    return status_code, payload


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('url',
                        type=str,
                        nargs='+',
                        help='the url testing point'
                        )
    args = parser.parse_args()
    url = args.url[0]
    print(url)

    status_code, payload = fetch_data(url)
    print(status_code)
    print(json.dumps(payload, indent=4))
