from base.apis import (
    MyCreateAPIView,
    MyObjectAPIView,
)
from .models import StockProfile
from .serializers import (
    StockPortfolioCountDistributionSerializer,
    StockPortfolioSummarySerializer,
)


class StockPortfolioCountDistributionAPIView(MyCreateAPIView):
    def get_serializer(self, *args, **kwargs):
        kwargs['user'] = self.request.user
        return StockPortfolioCountDistributionSerializer(*args, **kwargs)

    def perform_create(self, valdiated_data):
        pass


class StockPortfolioSummaryAPIView(MyCreateAPIView):
    def get_serializer(self, *args, **kwargs):
        kwargs['user'] = self.request.user
        return StockPortfolioSummarySerializer(*args, **kwargs)

    def perform_create(self, valdiated_data):
        pass


class StockProfileObjectAPIView(MyObjectAPIView):
    fields = ['tx_static_cost', 'tx_proportion_cost']
    http_method = ['get', 'put', ]
    model = StockProfile

    def get_object(self):
        user = self.request.user
        if not user or user.is_anonymous:
            return None
        object = self.model.objects.get(created_by=user, enable=True)
        return object
