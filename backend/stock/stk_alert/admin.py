from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockAlertMaster


# Register your models here.
class StockAlertMasterAdmin(MyBaseAdmin):
    list_display = ['stock_code',
                    'market_price_value',
                    'market_price_condition',
                    'market_price_trigger_at',
                    'ccass_percent_value',
                    'ccass_percent_condition',
                    'ccass_percent_trigger_at',
                    ]
    list_filter = ['market_price_condition',
                   'market_price_trigger_at',
                   'ccass_percent_condition',
                   'ccass_percent_trigger_at',
                   ]
    search_fields = ['stock_code', ]


admin.site.register(StockAlertMaster, StockAlertMasterAdmin)
