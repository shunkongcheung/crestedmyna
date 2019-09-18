from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (
    CharField,
    DateTimeField,
    Serializer,
    URLField,
)
from .utils import get_top_headlines


class NewsHeadlineItemSerializer(Serializer):
    author = CharField(read_only=True)
    description = CharField(read_only=True)
    publish_at = DateTimeField(read_only=True)
    title = CharField(read_only=True)
    thumbnail = URLField(read_only=True)
    url = URLField(read_only=True)


class NewsHeadlineSerializer(Serializer):
    headlines = NewsHeadlineItemSerializer(read_only=True, many=True)
    category = CharField(required=False)
    country = CharField(required=False)
    language = CharField(required=False)
    q = CharField(required=False)

    def validate(self, validated_data):
        category = validated_data.get('category')
        country = validated_data.get('country')
        language = validated_data.get('language')
        q = validated_data.get('q')
        try:
            headlines = get_top_headlines(
                category=category, country=country, language=language, q=q)
        except Exception as ex:
            raise ValidationError(str(ex))

        validated_data['headlines'] = headlines
        return validated_data
