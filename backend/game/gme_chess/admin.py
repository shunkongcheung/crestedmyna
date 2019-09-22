from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import (
    ChessMoveRequestMaster,
    ChessBoardResultMaster,
)


# Register your models here.
class ChessMoveRequestMasterAdmin(MyBaseAdmin):
    list_display = ['from_board',
                    'to_board',
                    'projected_child_count',
                    ]
    list_filter = []
    search_fields = ['from_board', ]


class ChessBoardResultMasterAdmin(MyBaseAdmin):
    list_display = ['from_board', 'to_board', ]
    list_filter = []
    search_fields = ['from_board', ]


admin.site.register(ChessMoveRequestMaster,
                    ChessMoveRequestMasterAdmin)

admin.site.register(ChessBoardResultMaster,
                    ChessBoardResultMasterAdmin)
