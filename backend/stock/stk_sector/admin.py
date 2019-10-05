from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import StockSectorMaster


# Register your models here.
class StockSectorMasterAdmin(MyBaseAdmin):
    list_display = []
    list_filter = []
    search_fields = []


admin.site.register(StockSectorMaster, StockSectorMasterAdmin)
