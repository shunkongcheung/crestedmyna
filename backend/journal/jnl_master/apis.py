from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)
from datetime import datetime
from django.utils.formats import get_format
from rest_framework.permissions import IsAdminUser

from .models import JournalMaster
from .serializers import JournalMasterSerializer

fields = ['name', 'location', 'description', 'medias', 'start_at', 'end_at', ]


def parse_date(date_str):
    """Parse date from string by DATE_INPUT_FORMATS of current language"""
    for item in get_format('DATE_INPUT_FORMATS'):
        try:
            return datetime.strptime(date_str, item).date()
        except (ValueError, TypeError):
            continue

    return None


class JournalMasterCreateAPIView(MyCreateAPIView):
    fields = fields
    model = JournalMaster
    serializer_class = JournalMasterSerializer


class JournalMasterListAPIView(MyListAPIView):
    fields = ['name', 'start_at', 'end_at', ]
    model = JournalMaster

    def get_queryset(self):
        queryset = super().get_queryset()
        date__lte = parse_date(self.request.query_params.get('date__lte'))
        date__gte = parse_date(self.request.query_params.get('date__gte'))

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
