from datetime import datetime

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
)
from stock.models import StockMaster

from .serializers import (
    CCASSParticipantDetailSerializer,
    CCASSParticipantTrendSerializer,
)


class CCASSParticipantDetailAPIView(MyCreateAPIView):
    serializer_class = CCASSParticipantDetailSerializer

    def perform_create(self, validated_date):
        pass
