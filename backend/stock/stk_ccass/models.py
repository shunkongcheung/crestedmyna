from base.models import MyBaseModel
from django.db import models

# Create your models here.


class CCASSParticipantMaster(MyBaseModel):
    participant_id = models.CharField(max_length=16)
    address = models.TextField(blank=True)


class CCASSParticipantDetail(MyBaseModel):
    stock_code = models.CharField(max_length=64)
    detail_date = models.DateField()

    participant_master = models.ForeignKey(CCASSParticipantMaster,
                                           on_delete=models.CASCADE
                                           )
    share_count = models.BigIntegerField()
    share_percent = models.FloatField()
