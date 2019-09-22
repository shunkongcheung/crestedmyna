from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import (
    ChessMoveRequestMaster,
    ChessBoardResultMaster,
    ChessBoardCalculateMaster,
)


# Register your models here.
class ChessBoardCalculateMasterAdmin(MyBaseAdmin):
    list_display = ['board', 'move_request_master', 'parent', ]
    list_filter = []
    search_fields = ['board', ]


class ChessBoardResultMasterAdmin(MyBaseAdmin):
    list_display = ['from_board', 'to_board', ]
    list_filter = []
    search_fields = ['from_board', ]


class ChessMoveRequestMasterAdmin(MyBaseAdmin):
    list_display = ['from_board',
                    'to_board',
                    'projected_child_count',
                    ]
    list_filter = []
    search_fields = ['from_board', ]


admin.site.register(ChessBoardCalculateMaster,
                    ChessBoardCalculateMasterAdmin)

admin.site.register(ChessBoardResultMaster,
                    ChessBoardResultMasterAdmin)


admin.site.register(ChessMoveRequestMaster,
                    ChessMoveRequestMasterAdmin)
