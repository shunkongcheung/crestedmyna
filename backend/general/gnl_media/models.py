from base.models import MyBaseModel
from django.db import models


class MediaMaster(MyBaseModel):
    file_name = models.CharField(max_length=256)
    file_type = models.CharField(max_length=32)
