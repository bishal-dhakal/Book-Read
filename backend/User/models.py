from django.db import models
from django.contrib.auth.models import AbstractUser
from .Managers import CustomUserManager
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.db import models


# Create your models here.
class CustomUser(AbstractUser):
    username = models.CharField(
        max_length=20,
        unique=True,
        help_text="Required. 20 or fewer character. Letters, digits, and spaces only",
        validators=[],
        error_messages={
            'unique':'Username not available.'
        }
    )

    email = models.EmailField(
        max_length=100,
        unique=True,
        validators=[],
        error_messages={
            'unique':'Email already exists.'
        }
    )
    is_author = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    

