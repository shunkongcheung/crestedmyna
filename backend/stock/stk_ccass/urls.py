from django.conf.urls import url
from .apis import (
    CCASSCreateStockHoldingDisclosureRecordsAPIView,
    CCASSParticipantDetailAPIView,
)

app_name = 'stk_ccass'

urlpatterns = [
    url(r'^create_shareholding_disclosure_records/$',
        CCASSCreateStockHoldingDisclosureRecordsAPIView.as_view(),
        name='stk_ccass-api-create_shareholding_disclosure_records'
        ),
    url(r'^$',
        CCASSParticipantDetailAPIView.as_view(),
        name='stk_ccass-api-participant_detail'
        ),
]
