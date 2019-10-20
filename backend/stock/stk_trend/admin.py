from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockCCASSAndPriceSummaryDetail


# Register your models here.
class StockCCASSAndPriceSummaryDetailAdmin(MyBaseAdmin):
    list_display = ['detail_date',
                    'nominal_price',
                    'stock_code',
                    'participant_percent'
                    ]
    list_filter = ['detail_date', ]

    search_fields = ['stock_code', ]


admin.site.register(StockCCASSAndPriceSummaryDetail,
                    StockCCASSAndPriceSummaryDetailAdmin
                    )
