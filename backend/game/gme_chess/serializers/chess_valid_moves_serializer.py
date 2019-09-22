from rest_framework.serializers import (
    CharField,
    BooleanField,
    ListField,
    Serializer,
)

from game.gme_chess.utils import (
    get_board_from_hash,
    get_next_boards,
    get_hash_from_board,
)


class ChessValidMovesSerializer(Serializer):
    from_board = CharField()
    is_upper = BooleanField(default=True)

    valid_boards = ListField(child=CharField(), read_only=True)

    def validate(self, data):
        from_board = get_board_from_hash(data['from_board'])
        is_upper = data['is_upper']
        data['valid_boards'] = [
            get_hash_from_board(valid_board)
            for valid_board in get_next_boards(from_board, is_upper)
        ]
        return data
