from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import MediaMaster


# Register your models here.
class MediaMasterAdmin(MyBaseAdmin):
    list_display = ['file_name', 'file_type', ]
    list_filter = ['file_type', ]
    search_field = ['file_name', ]


admin.site.register(MediaMaster, MediaMasterAdmin)
