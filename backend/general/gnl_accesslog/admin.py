from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import AccessLog


# Register your models here.
class AccessLogAdmin(MyBaseAdmin):
    list_display = ['error', 'status_code', 'payload', ]
    list_filter = ['status_code', ]
    search_fields = []


admin.site.register(AccessLog, AccessLogAdmin)
