from rest_framework.serializers import (
    CharField,
    DateTimeField,
    Serializer,
    URLField,
)


class StockNewsSerializer(Serializer):
    release_time = DateTimeField()
    headline = CharField()
    document_link = URLField()
