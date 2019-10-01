from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import (
    CCASSParticipantMaster
)


# Register your models here.
class CCASSParticipantMasterAdmin(MyBaseAdmin):
    list_display = ['participant_id', 'address', ]
    list_filter = []
    search_fields = ['participant_id', ]


admin.site.register(CCASSParticipantMaster, CCASSParticipantMasterAdmin)
