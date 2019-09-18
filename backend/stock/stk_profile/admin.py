from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockProfile


# Register your models here.
class StockProfileAdmin(MyBaseAdmin):
    list_display = ['tx_static_cost', 'tx_proportion_cost', ]
    list_filter = []
    search_fields = []


admin.site.register(StockProfile, StockProfileAdmin)
