from datetime import datetime
from rest_framework.permissions import IsAdminUser

from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
)
from stock.models import StockMaster

from .serializers import (
    CCASSCreateStockHoldingDisclosureRecordsSerializer,
    CCASSParticipantDetailSerializer,
)


class CCASSCreateStockHoldingDisclosureRecordsAPIView(MyCreateAPIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = CCASSCreateStockHoldingDisclosureRecordsSerializer

    def perform_create(self, validated_date):
        pass


class CCASSParticipantDetailAPIView(MyCreateAPIView):
    serializer_class = CCASSParticipantDetailSerializer

    def perform_create(self, validated_date):
        pass
