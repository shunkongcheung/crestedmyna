from rest_framework.serializers import (
    CharField,
    Serializer,
)


class ChessInitialBoardSerializer(Serializer):
    board = CharField()
