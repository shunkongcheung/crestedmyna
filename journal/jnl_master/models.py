from base.models import MyBaseModel
from django.db import models

# Create your models here.


class JournalMaster(MyBaseModel):
    location = models.CharField(max_length=512)
    description = models.TextField(blank=True)
