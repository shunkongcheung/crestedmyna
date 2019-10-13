from datetime import datetime

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
)

from .utils import get_ccass_trend
from .serializers import (
    CCASSParticipantDetailSerializer,
    CCASSParticipantTrendSerializer,
)


class CCASSParticipantDetailAPIView(MyCreateAPIView):
    serializer_class = CCASSParticipantDetailSerializer

    def perform_create(self, validated_date):
        pass


class CCASSParticipantTrendAPIView(MyListAPIView):
    serializer_class = CCASSParticipantTrendSerializer

    def get_queryset(self):
        date = self.kwargs['date']
        print(date)
        date = datetime.strptime(date, '%Y%m%d')
        return get_ccass_trend(date)
