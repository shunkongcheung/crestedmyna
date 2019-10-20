from base.models import MyBaseModel
from django.db import models


class StockCCASSAndPriceSummaryDetail(MyBaseModel):
    detail_date = models.DateField()
    nominal_price = models.FloatField()
    stock_code = models.CharField(max_length=64)
    participant_percent = models.FloatField()
