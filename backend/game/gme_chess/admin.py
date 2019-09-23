from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import (
    ChessMoveRequestMaster,
    ChessBoardResultMaster,
    ChessBoardCalculateMaster,
)


# Register your models here.
class ChessBoardCalculateMasterAdmin(MyBaseAdmin):
    list_display = ['board',
                    'level',
                    'is_upper_side',
                    'score',
                    'is_calculated',
                    'move_request_master',
                    'parent',
                    ]
    list_filter = ['is_calculated', ]
    search_fields = ['board', 'move_request_master__from_board', ]


class ChessBoardResultMasterAdmin(MyBaseAdmin):
    list_display = ['from_board', 'to_boards', ]
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
