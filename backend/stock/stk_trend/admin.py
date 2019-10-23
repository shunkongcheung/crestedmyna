from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockCCASSAndPriceSummaryDetail


# Register your models here.
class StockCCASSAndPriceSummaryDetailAdmin(MyBaseAdmin):
    list_display = ['detail_date',
                    'nominal_price',
                    'participant_percent',
                    'stock_code',
                    'turnover',
                    ]
    list_filter = ['detail_date', ]

    search_fields = ['stock_code', ]


admin.site.register(StockCCASSAndPriceSummaryDetail,
                    StockCCASSAndPriceSummaryDetailAdmin
                    )
