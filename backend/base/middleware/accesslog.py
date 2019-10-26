from django.utils.deprecation import MiddlewareMixin

from ..utils import get_admin_user
from general.models import AccessLog


class AccessLogMiddleware(MiddlewareMixin):
    def create_access_log(self, name, payload, request, response, is_error):
        user = self.get_user(request)

        try:
            status_code = response.status_code
        except:
            status_code = 500

        if is_error:
            error = str(response)
        elif status_code < 200 or status_code >= 400:
            error = response.data
        else:
            error = None

        AccessLog.objects.create(
            name=name,
            payload=payload,
            method=request.method,
            status_code=status_code,
            error=error,
            created_by=user,
        )

    def get_user(self, request):
        if not hasattr(request, 'user'):
            return get_admin_user()
        if request.user.is_anonymous:
            return get_admin_user()
        return request.user

    def process_view(self, request, view_func, view_args, view_kwargs):
        payload = {**view_kwargs, **request.GET}
        name = view_func.__name__
        try:
            response = view_func(request, *view_args, **view_kwargs)
            self.create_access_log(name, payload, request, response, False)
            return response
        except Exception as ex:
            self.create_access_log(name, payload, request, ex, True)
            raise ex
