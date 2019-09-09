from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import MediaMaster


# Register your models here.
class MediaMasterAdmin(MyBaseAdmin):
    list_display = ['access_url', 'file_type', ]
    list_filter = ['file_type', ]


admin.site.register(MediaMaster, MediaMasterAdmin)
