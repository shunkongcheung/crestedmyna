from rest_framework.generics import CreateAPIView
from rest_framework_jwt.views import (
    ObtainJSONWebToken,
    RefreshJSONWebToken,
)

from .serializers import (
    AuthRegisterSerializer,
    AuthLoginSerializer,
)


class AuthLoginAPIView(ObtainJSONWebToken):
    serializer_class = AuthLoginSerializer


class AuthRefreshAPIView(RefreshJSONWebToken):
    pass


class AuthRegisterAPIView(CreateAPIView):
    permission_classes = []
    serializer_class = AuthRegisterSerializer
