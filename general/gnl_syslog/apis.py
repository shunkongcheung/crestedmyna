from base.apis import MyListAPIView


from .models import SystemLog


class SystemLogListAPIView(MyListAPIView):
    # permission_classes = []
    model = SystemLog
