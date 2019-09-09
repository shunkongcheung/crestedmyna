from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import LookUp


# Register your models here.
class LookUpAdmin(MyBaseAdmin):
    list_display = ['catagory', 'is_public', 'lookup_value', ]


admin.site.register(LookUp, LookUpAdmin)
