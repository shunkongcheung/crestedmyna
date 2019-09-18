from base.apis import MyCreateAPIView
from .serializers import NewsHeadlineSerializer


class NewsHeadlineAPIView(MyCreateAPIView):
    serializer_class = NewsHeadlineSerializer

    def perform_create(self, serializer):
        pass
