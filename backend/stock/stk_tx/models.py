from base.models import MyBaseModel
from django.db import models

# Create your models here.


class StockTx(MyBaseModel):
    TX_BUY = ('BUY', 'Buy')
    TX_SELL = ('SELL', 'Sell')
    # TX_DIVIDEND = ('DIVIDEND', 'Dividend')
    TX_TYPES = [TX_BUY, TX_SELL,  # TX_DIVIDEND,
                ]

    stock_master = models.ForeignKey('stock.StockMaster',
                                     on_delete=models.CASCADE,
                                     related_name='stock_txs'
                                     )
    tx_date = models.DateTimeField()

    tx_type = models.CharField(max_length=64, choices=TX_TYPES)
    share_count = models.IntegerField()
    price = models.FloatField()

    gross_value = models.FloatField()  # share_count * price
    trade_cost = models.FloatField()  # (0.001188888888888+0.002) * gross_value

    # tx_type == 'BUY' ? gross_value - trade_cost  : gross_value + trade_cost
    net_value = models.FloatField()
