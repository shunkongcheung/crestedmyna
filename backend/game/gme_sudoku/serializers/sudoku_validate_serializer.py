from rest_framework.serializers import (
    BooleanField,
    CharField,
    Serializer,
)
from game.gme_sudoku.utils import (
    get_is_board_valid,
    get_board_from_hash,
)


class SudokuValidateSerializer(Serializer):
    is_valid = BooleanField(read_only=True)
    current_board = CharField()

    def validate(self, data):
        current_board = get_board_from_hash(data['current_board'])
        is_valid = get_is_board_valid(current_board)

        data['is_valid'] = is_valid
        return data
