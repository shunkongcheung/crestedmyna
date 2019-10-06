from base.models import MyBaseModel
from django.db import models

# Create your models here.


class StockProfile(MyBaseModel):
    tx_static_cost = models.FloatField(default=0.0)
    tx_proportion_cost = models.FloatField(default=0.0)
