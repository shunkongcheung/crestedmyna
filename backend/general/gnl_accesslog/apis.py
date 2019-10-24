from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

# from .models import ModelName
# from .serializers import ModelNameSerializer

fields = []


class ModelNameCreateAPIView(MyCreateAPIView):
    fields = fields
    model = ModelName
    # serializer_class = ModelNameSerializer


class ModelNameListAPIView(MyListAPIView):
    fields = []
    model = ModelName


class ModelNameObjectAPIView(MyObjectAPIView):
    fields = fields
    model = ModelName
    # serializer_class = ModelNameSerializer
