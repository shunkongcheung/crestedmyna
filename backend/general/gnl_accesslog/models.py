from django.contrib.postgres.fields import JSONField
from django.db import models

from base.models import MyBaseModel

# Create your models here.


class AccessLog(MyBaseModel):
    error = JSONField(null=True, blank=True)
    payload = JSONField(null=True, blank=True)
    status_code = models.IntegerField()
