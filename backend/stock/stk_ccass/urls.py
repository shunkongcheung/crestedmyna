from django.conf.urls import url
from .apis import (
    CCASSParticipantDetailAPIView,
    CCASSParticipantTrendAPIView,
)

app_name = 'stk_ccass'

urlpatterns = [
    url(r'^$',
        CCASSParticipantDetailAPIView.as_view(),
        name='stk_ccass-api-participant_detail'
        ),
    url(r'^(?P<date>[0-9]+)/$',
        CCASSParticipantTrendAPIView.as_view(),
        name='stk_ccass-api-trend'
        ),
]
