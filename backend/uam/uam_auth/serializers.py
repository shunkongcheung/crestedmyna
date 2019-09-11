from django.contrib.auth.models import User
from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
)
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer

jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class AuthRegisterSerializer(ModelSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].write_only = True

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'email', ]

    def create(self, data):
        instance = super().create(data)
        instance.set_password(data['password'])
        instance.save()
        return instance


class AuthLoginSerializer(JSONWebTokenSerializer):
    def validate(self, data):
        ret = super().validate(data)
        user, token = ret['user'], ret['token']
        payload_decoded = jwt_decode_handler(token)
        payload_decoded['email'] = user.email
        payload_decoded['first_name'] = user.first_name
        payload_decoded['last_name'] = user.last_name
        amended_token = jwt_encode_handler(payload_decoded)
        ret['token'] = amended_token
        return ret
