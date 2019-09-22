from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import ChessMoveRequestMaster


# Register your models here.
class ChessMoveRequestMasterAdmin(MyBaseAdmin):
    list_display = ['from_board',
                    'to_board',
                    'projected_child_count',
                    ]
    list_filter = []
    search_fields = []


admin.site.register(ChessMoveRequestMaster,
                    ChessMoveRequestMasterAdmin)
