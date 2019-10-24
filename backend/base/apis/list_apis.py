from rest_framework.generics import ListAPIView

from general.models import AccessLog

from .base_apis import MyBaseAPIView
from ..utils import get_admin_user


class MyListAPIView(ListAPIView, MyBaseAPIView):
    search_fields = ['name', ]
    filter_fields = ['name', ]
    ordering_fields = []

    def create_access_log(self, response, is_error):
        class_name = self.__class__.__name__
        user = self.get_user(self.request)
        payload = self.request.query_params
        status_code = response.status_code
        error = str(response) if is_error else None

        AccessLog.objects.create(
            name=class_name,
            payload=payload,
            status_code=status_code,
            error=error,
            created_by=user,
        )

    def get(self, request, *args, **kwargs):

        try:
            response = super().get(request, *args, **kwargs)
            self.create_access_log(response, False)
            return response
        except Exception as ex:
            self.create_access_log(ex, True)
            raise ex
