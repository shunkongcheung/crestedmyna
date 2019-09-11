from rest_framework.generics import CreateAPIView
from rest_framework_jwt.views import (
    ObtainJSONWebToken,
    RefreshJSONWebToken,
)

from .serializers import AuthRegisterSerializer


class AuthLoginAPIView(ObtainJSONWebToken):
    pass


class AuthRefreshAPIView(RefreshJSONWebToken):
    pass


class AuthRegisterAPIView(CreateAPIView):
    permission_classes = []
    serializer_class = AuthRegisterSerializer
