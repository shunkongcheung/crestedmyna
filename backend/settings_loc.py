
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'd08-8l*%qvqlaoji_ap0$8--_o4^cggn@cujtjmj0pksezab8^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PORT': '5433'
    }
}
