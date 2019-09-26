from base.admin import MyBaseAdmin
from django.contrib import admin

from .models import SudokuGameRecordMaster


# # Register your models here.
class SudokuGameRecordMasterAdmin(MyBaseAdmin):
    list_display = ['current_board',
                    'start_board',
                    'used_second',
                    'is_finished',
                    ]
    list_filter = ['is_finished', ]
    search_fields = ['current_board', ]


admin.site.register(SudokuGameRecordMaster, SudokuGameRecordMasterAdmin)
