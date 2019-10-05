from base.apis import MyCreateAPIView

from .serializers import StockTrendSerializer


class StockTrendAPIView(MyCreateAPIView):
    serializer_class = StockTrendSerializer

    def perform_create(self, validated_data):
        pass
