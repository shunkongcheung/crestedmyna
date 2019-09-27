from base.apis import (
    MyCreateAPIView,
    MyListAPIView,
    MyObjectAPIView,
)

from .models import SudokuGameRecordMaster
from .serializers import SudokuInitialBoardSerializer

fields = ['start_board',
          'current_board',
          'solution_board',
          'used_second',
          'difficulty',
          ]


class SudokuInitialBoardSerializerAPIView(MyCreateAPIView):
    serializer_class = SudokuInitialBoardSerializer

    def perform_create(self, validated_data):
        pass


class SudokuGameRecordMasterObjectAPIView(MyObjectAPIView):
    fields = fields
    http_methods = ['get', 'put', ]
    model = SudokuGameRecordMaster

    def get_object(self):
        defaults = {
            'start_board': '',
            'solution_board': '',
            'current_board': '',
            'difficulty': 'easy',
        }
        object, created = self.model.objects\
            .get_or_create(created_by=self.request.user, enable=True, defaults=defaults)
        return object
