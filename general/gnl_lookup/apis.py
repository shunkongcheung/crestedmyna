from base.apis import MyListAPIView
from rest_framework.permissions import IsAdminUser

from .models import LookUp


class LookUpListAPIView(MyListAPIView):
    fields = ['name', 'catagory', 'is_public', 'lookup_value', ]
    model = LookUp

    def get_queryset(self):
        enabled = self.model.objects.filter(enable=True)
        if self.user.is_superuser:
            return enabled
        return enabled.filter(is_public=True)
