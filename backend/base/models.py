from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class MyBaseModel(models.Model):
    class Meta:
        abstract = True

    name = models.CharField(max_length=128)
    enable = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User,
                                   related_name="+",
                                   on_delete=models.CASCADE
                                   )
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)
