from base.models import MyBaseModel
from django.db import models


class StockCCASSAndPriceSummaryDetail(MyBaseModel):
    detail_date = models.DateField()
    nominal_price = models.FloatField()
    participant_percent = models.FloatField()
    participant_share = models.FloatField()
    stock_code = models.CharField(max_length=64)
    turnover = models.FloatField()

    class Meta:
        unique_together = ['detail_date', 'stock_code', ]
