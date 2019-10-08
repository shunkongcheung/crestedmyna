from base.apis import MyListAPIView
from .models import StockSectorMaster


fields = []


class StockSectorMasterListAPIView(MyListAPIView):
    model = StockSectorMaster

    def get_queryset(self):
        return StockSectorMaster.objects\
            .filter(enable=True)
