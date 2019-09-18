from base.models import MyBaseModel
from django.db import models

# Create your models here.


class StockMaster(MyBaseModel):
    stock_code = models.CharField(max_length=64)

    share_count = models.IntegerField(default=0)
    market_price = models.FloatField(default=0)  # update on refresh
    market_value = models.FloatField(default=0.0)  # share_count * market_price
    realized_value = models.FloatField(default=0.0)
