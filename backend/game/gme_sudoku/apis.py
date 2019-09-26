from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .models import SudokuGameRecordMaster
from .serializers import SudokuInitialBoardSerializer

fields = ['start_board', 'current_board', 'used_second', 'is_finished', ]


class SudokuInitialBoardSerializerAPIView(MyCreateAPIView):
    serializer_class = SudokuInitialBoardSerializer

    def perform_create(self, validated_data):
        pass


class SudokuGameRecordMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    http_methods = ['get', 'put', ]
    model = SudokuGameRecordMaster

    def get_object(self):
        object, created = self.models.objects\
            .get_or_create(created_by=self.request.user, enable=True)
        return object
