from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .models import SudokuGameRecordMaster
from .serializers import (
    SudokuInitialBoardSerializer,
    SudokuValidateSerializer,
)

fields = ['start_board',
          'current_board',
          'solution_board',
          'used_second',
          'difficulty',
          ]


class SudokuInitialBoardAPIView(MyCreateAPIView):
    serializer_class = SudokuInitialBoardSerializer

    def perform_create(self, validated_data):
        pass


class SudokuGameRecordMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    http_methods = ['get', 'put', ]
    model = SudokuGameRecordMaster

    def get_object(self):
        object, created = self.model.objects\
            .get_or_create(created_by=self.request.user, enable=True)
        return object


class SudokuValidateAPIView(MyCreateAPIView):
    serializer_class = SudokuValidateSerializer

    def perform_create(self, validated_data):
        pass
