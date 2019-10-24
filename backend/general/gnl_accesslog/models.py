from django.contrib.postgres.fields import JSONField
from django.db import models

from base.models import MyBaseModel

# Create your models here.


class AccessLog(MyBaseModel):
    MTD_GET = ('GET', 'Get',)
    MTD_PUT = ('PUT', 'Put',)
    MTD_POST = ('POST', 'Post',)
    MTD_DELETE = ('DELETE', 'Delete',)
    MTD_OTHER = ('OTHER', 'Other',)
    METHODS = [MTD_GET, MTD_PUT, MTD_POST, MTD_DELETE, MTD_OTHER, ]

    error = JSONField(null=True, blank=True)
    method = models.CharField(max_length=16, choices=METHODS)
    payload = JSONField(null=True, blank=True)
    status_code = models.IntegerField()
