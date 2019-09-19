from django.contrib.auth.models import User


def get_admin_user():
    return User.objects.get(username='admin')
