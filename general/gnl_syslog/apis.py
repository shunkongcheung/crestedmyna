from base.apis import MyListAPIView
from rest_framework.permissions import IsAdminUser

from .models import SystemLog


class SystemLogListAPIView(MyListAPIView):
    permission_classes = [IsAdminUser, ]
    model = SystemLog
