from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import JournalMaster
from .serializers import JournalMasterSerializer


class JournalMasterCreateAPIView(MyCreateAPIView):
    fields = ['name', 'location', 'description', 'images']
    model = JournalMaster
    serializer_class = JournalMasterSerializer


class JournalMasterListAPIView(MyListAPIView):
    model = JournalMaster


class JournalMasterObjectAPIView(MyObjectAPIView):
    fields = ['name', 'location', 'description', 'images']
    model = JournalMaster
    serializer_class = JournalMasterSerializer
