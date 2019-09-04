from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated


class MyBaseAPIView(GenericAPIView):
    permissions_classes = [IsAuthenticated, ]

    def get_queryset(self):
        print('hey here....', self.request.user)
        return self.model.objects.filter(created_by=self.request.user,
                                         enable=True
                                         )
