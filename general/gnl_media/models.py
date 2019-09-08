from base.models import MyBaseModel
from django.db import models


class MediaMaster(MyBaseModel):
    access_url = models.URLField()
    file_type = models.CharField(max_length=32)
