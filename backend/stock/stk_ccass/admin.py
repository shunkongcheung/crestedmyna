from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import (
    CCASSParticipantMaster,
    CCASSParticipantDetail,
)


# Register your models here.
class CCASSParticipantMasterAdmin(MyBaseAdmin):
    list_display = ['participant_id', 'address', ]
    list_filter = []
    search_fields = ['participant_id', ]


class CCASSParticipantDetailAdmin(MyBaseAdmin):
    list_display = ['stock_code',
                    'detail_date',
                    'participant_master',
                    'share_count',
                    'share_percent',
                    ]
    list_filter = ['detail_date', ]
    search_fields = ['stock_code',
                     'participant_master__name',
                     'participant_master__participant_id',
                     ]


admin.site.register(CCASSParticipantMaster, CCASSParticipantMasterAdmin)
admin.site.register(CCASSParticipantDetail, CCASSParticipantDetailAdmin)
