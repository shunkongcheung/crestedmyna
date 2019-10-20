from django.conf.urls import url
from .apis import CCASSParticipantDetailAPIView

app_name = 'stk_ccass'

urlpatterns = [
    url(r'^$',
        CCASSParticipantDetailAPIView.as_view(),
        name='stk_ccass-api-participant_detail'
        ),
]
