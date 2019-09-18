from base.apis import MyObjectAPIView
from .models import StockProfile

fields = ['tx_static_cost', 'tx_proportion_cost']


class StockProfileObjectAPIView(MyObjectAPIView):
    fields = fields
    model = StockProfile

    def get_object(self):
        user = self.request.user
        if not user or user.is_anonymous:
            return None
        object, created = self.model.objects.get_or_create(
            created_by=user,
            enable=True,
            defaults={'created_by': user, }
        )
        return object
