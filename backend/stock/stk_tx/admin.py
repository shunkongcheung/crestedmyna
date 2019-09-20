from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockTx


# Register your models here.
class StockTxAdmin(MyBaseAdmin):
    list_display = ['stock_master', 'tx_type', 'tx_at',
                    'share_count', 'price', 'gross_value', 'trade_cost', 'net_value',
                    ]
    search_fields = ['stock_master__name', 'stock_master__stock_code', ]
    list_filter = ['tx_type', ]


admin.site.register(StockTx, StockTxAdmin)
