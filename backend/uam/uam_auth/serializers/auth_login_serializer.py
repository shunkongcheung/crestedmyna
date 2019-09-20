from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer

jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


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
