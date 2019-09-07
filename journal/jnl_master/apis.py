from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import JournalMaster


class JournalMasterCreateAPIView(MyCreateAPIView):
    fields = ['name', 'location', 'description', ]
    model = JournalMaster


class JournalMasterListAPIView(MyListAPIView):
    model = JournalMaster


class JournalMasterObjectAPIView(MyObjectAPIView):
    model = JournalMaster
