from rest_framework_jwt.settings import api_settings

from .get_admin_user import get_admin_user

import asyncio
import requests


def fetch_app_action(url, data):
    asyncio.run(internal_fetch(url, data))


async def internal_fetch(url, data):
    jwt_token = get_admin_jwt()
    headers = {
        'Authorization': f'JWT {jwt_token}',
        'Content-Type': 'application/json',
    }

    requests.post(
        url=f'http://localhost:7000/api/{url}/',
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
