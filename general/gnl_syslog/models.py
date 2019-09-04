from base.models import MyBaseModel
from django.db import models

# Create your models here.


class SystemLog(MyBaseModel):
    LVL_DEBUG = ('DEBUG', 'Debug')
    LVL_INFO = ('INFO', 'Info')
    LVL_ERROR = ('ERROR', 'Error')
    LVL_CHOCIES = [LVL_DEBUG, LVL_INFO, LVL_ERROR, ]

    level = models.CharField(max_length=64,
                             choices=LVL_CHOCIES
                             )
    message = models.TextField()
