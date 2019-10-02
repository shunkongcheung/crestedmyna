from django.conf.urls import url
from .apis import (
    CCASSParticipantDetailAPIView,
    # ModelNameListAPIView,
    # ModelNameObjectAPIView,
)

app_name = 'stk_ccass'

urlpatterns = [
    url(r'^$',
        CCASSParticipantDetailAPIView.as_view(),
        name='stk_ccass-api-participant_detail'
        ),
    #     url(r'^list/$',
    #         ModelNameListAPIView.as_view(),
    #         name='stk_ccass-api-list'
    #         ),
    #     url(r'^(P<pk>[0-9]+)/$',
    #         ModelNameObjectAPIView.as_view(),
    #         name='stk_ccass-api-object'
    #         ),
]
