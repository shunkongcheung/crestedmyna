from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockAlertMaster


# Register your models here.
class StockAlertMasterAdmin(MyBaseAdmin):
    list_display = ['stock_code',
                    'market_price_value',
                    'market_price_condition',
                    'ccass_percent_value',
                    'ccass_percent_condition',
                    ]
    list_filter = ['market_price_condition',
                   'ccass_percent_condition',
                   ]
    search_fields = ['stock_code', ]


admin.site.register(StockAlertMaster, StockAlertMasterAdmin)
