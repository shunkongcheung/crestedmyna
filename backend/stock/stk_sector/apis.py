from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

# from .models import ModelName
# from .serializers import ModelNameSerializer

fields = []


class ModelNameListAPIView(MyListAPIView):
    model = ModelName
