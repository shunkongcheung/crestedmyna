from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockMaster


# Register your models here.
class StockMasterAdmin(MyBaseAdmin):
    list_display = [
        'market_price',
        'market_value',
        'realized_value',
        'sector',
        'stock_code',
        'share_count',
        'turnover',
        'unrealized_value',
    ]


admin.site.register(StockMaster, StockMasterAdmin)
