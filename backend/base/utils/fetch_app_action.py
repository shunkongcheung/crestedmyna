from rest_framework_jwt.settings import api_settings

from general.gnl_lookup.utils import get_lookup_value
from .get_admin_user import get_admin_user

import asyncio
import requests


def fetch_app_action(url, data):
    try:
        asyncio.run(internal_fetch(url, data))
    except:
        asyncio.run_until_complete(internal_fetch(url, data))


async def internal_fetch(url, data):
    jwt_token = get_admin_jwt()
    headers = {
        'Authorization': f'JWT {jwt_token}',
        'Content-Type': 'application/json',
    }

    host_name = get_lookup_value('HOST_NAME')
    requests.post(
        url=f'{host_name}/api/{url}/',
        json=data,
        headers=headers
    )


def get_admin_jwt():
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    admin_user = get_admin_user()
    payload = jwt_payload_handler(admin_user)
    token = jwt_encode_handler(payload)
    return token
