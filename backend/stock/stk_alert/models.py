from base.models import MyBaseModel
from django.db import models

# Create your models here.


class StockAlertMaster(MyBaseModel):
    COND_ABOVE = 'COND_ABOVE'
    COND_BELOW = 'COND_BELOW'
    COND_CHOICES = [
        (COND_ABOVE, 'When value is above'),
        (COND_BELOW, 'When value is below'),
    ]

    stock_code = models.CharField(max_length=16)

    market_price_value = models.FloatField(default=0)
    market_price_condition = models.CharField(
        max_length=16,
        choices=COND_CHOICES,
        default=COND_ABOVE,
    )

    ccass_percent_value = models.FloatField(default=0)
    ccass_percent_condition = models.CharField(
        max_length=16,
        choices=COND_CHOICES,
        default=COND_ABOVE,
    )
