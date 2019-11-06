import boto3

from backend.credentials import (
    BOTO_KEY,
    BOTO_SECRET,
)


def get_boto_client():
    session = boto3.session.Session()
    client = session.client('s3',
                            region_name='sgp1',
                            endpoint_url='https://sgp1.digitaloceanspaces.com',
                            aws_access_key_id=BOTO_KEY,
                            aws_secret_access_key=BOTO_SECRET
                            )
    return client
