from base.models import MyBaseModel
from django.db import models

# Create your models here.


class LookUp(MyBaseModel):
    catagory = models.CharField(max_length=128)
    lookup_value = models.TextField()
    is_public = models.BooleanField(default=False)
