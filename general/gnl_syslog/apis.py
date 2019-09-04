from base.apis import MyListAPIView
from rest_framework.permissions import IsAdminUser

from .models import SystemLog


class SystemLogListAPIView(MyListAPIView):
    fields = ['name', 'level', 'message', ]
    filter_fields = ['name', 'level', 'message', ]
    search_fields = ['name', ]
    permission_classes = [IsAdminUser, ]
    model = SystemLog
