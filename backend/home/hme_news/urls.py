from django.conf.urls import url
from .apis import (
    NewsHeadlineAPIView,
)

app_name = 'hme_news'

urlpatterns = [
    url(r'^headlines/$',
        NewsHeadlineAPIView.as_view(),
        name='hme_news-api-headlines'
        ),
]
