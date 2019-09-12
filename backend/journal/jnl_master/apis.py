from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from rest_framework.permissions import IsAdminUser

from .models import JournalMaster
from .serializers import JournalMasterSerializer
from .utils import get_datetime_from_string

fields = ['name', 'location', 'description', 'medias', 'start_at', 'end_at', ]


class JournalMasterCreateAPIView(MyCreateAPIView):
    fields = fields
    model = JournalMaster
    serializer_class = JournalMasterSerializer


class JournalMasterListAPIView(MyListAPIView):
    fields = ['name', 'start_at', 'end_at', ]
    model = JournalMaster

    def get_queryset(self):
        queryset = super().get_queryset()
        date__lte = self.request.query_params.get('date__lte')
        date__lte = get_datetime_from_string(date__lte)
        date__gte = self.request.query_params.get('date__gte')
        date__gte = get_datetime_from_string(date__gte)

        print(date__lte, date__gte)
        if not date__lte or not date__gte:
            return queryset

        start_at_qs = queryset.filter(start_at__lte=date__lte,
                                      start_at__gte=date__gte)
        end_at_qs = queryset.filter(end_at__lte=date__lte,
                                    end_at__gte=date__gte)
        return start_at_qs | end_at_qs


class JournalMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    model = JournalMaster
    serializer_class = JournalMasterSerializer
