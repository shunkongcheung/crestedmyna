from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import JournalMaster


# Register your models here.
class JournalMasterAdmin(MyBaseAdmin):
    list_display = ['location', 'description', ]


admin.site.register(JournalMaster, JournalMasterAdmin)