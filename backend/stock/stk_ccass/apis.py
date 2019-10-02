from base.apis import (
    MyCreateAPIView,
)

from .serializers import CCASSParticipantDetailSerializer


class CCASSParticipantDetailAPIView(MyCreateAPIView):
    serializer_class = CCASSParticipantDetailSerializer

    def perform_create(self, validated_date):
        pass
