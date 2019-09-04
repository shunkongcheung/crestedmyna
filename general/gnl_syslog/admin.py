from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import SystemLog


# Register your models here.
class SystemLogAdmin(MyBaseAdmin):
    list_display = ['level', 'message', ]


admin.site.register(SystemLog, SystemLogAdmin)
