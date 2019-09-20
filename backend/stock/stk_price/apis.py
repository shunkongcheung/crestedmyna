from base.apis import MyCreateAPIView

from .serializers import StockPriceSerializer


class StockPriceAPIView(MyCreateAPIView):
    serializer_class = StockPriceSerializer

    def perform_create(self, validated_data):
        pass
