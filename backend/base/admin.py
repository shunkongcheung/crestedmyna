from django.contrib import admin

# Register your models here.


class MyBaseAdmin(admin.ModelAdmin):
    list_display = []
    list_filter = []
    search_fields = []

    def insert_list_display(self, item, is_prepend=False):
        if item not in self.list_display:
            if is_prepend:
                self.list_display = [item] + self.list_display
            else:
                self.list_display += [item]

    def insert_search_fields(self, item):
        if item not in self.search_fields:
            self.search_fields += [item, ]

    def insert_list_filter(self, item):
        if item not in self.list_filter:
            self.list_filter += [item, ]

    def __init__(self, *args, **kwargs):
        # list display ----------------------------------------------------
        self.insert_list_display('name', is_prepend=True)

        insert_items = ['enable', 'created_by', 'created_at', 'modified_at', ]
        for item in insert_items:
            self.insert_list_display(item)

        # search fields ---------------------------------------------------
        self.insert_search_fields('name')

        # list filter -----------------------------------------------------
        insert_filters = ['enable', 'created_by', ]
        for item in insert_filters:
            self.insert_list_filter(item)

        ret = super(MyBaseAdmin, self).__init__(*args, **kwargs)
        return ret

    def get_ordering(self, request):
        return [('-created_at')]
