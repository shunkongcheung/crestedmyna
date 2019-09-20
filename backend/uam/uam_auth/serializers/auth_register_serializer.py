from django.contrib.auth.models import User
from stock.models import StockProfile
from rest_framework.serializers import ModelSerializer


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

        stock_profile = StockProfile.objects.create(created_by=instance,
                                                    name=instance.username
                                                    )
        stock_profile.save()

        return instance
