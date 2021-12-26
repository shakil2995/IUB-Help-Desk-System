import uuid
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone

from .modelchioce import PRIORITY_CHOICE, RESOLVE_CHOICE, USER_TYPE_CHOICE

today = timezone.now


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True, max_length=255)
    mobile = models.CharField(max_length=255, blank=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    user_type = models.CharField(choices=USER_TYPE_CHOICE,max_length=255,default='admin')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def __str__(self):
        return str(self.email)


class TokenAuth(models.Model):
    account = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_validated = models.BooleanField(default=False)
    logged_in = models.BooleanField(default=False)
    refresh_token = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.account

# class Permission(models.Model):
#     user = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
#     permission_name = models.TextField()
#     price = models.DecimalField(max_digits=6, decimal_places=2)
#     created_date = models.DateTimeField(auto_now_add=True)
#     updated_date = models.DateTimeField(auto_now=True)

class Ticket(models.Model):
    title = models.CharField(max_length=255,default="")
    description = models.TextField(default="")
    initiator = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='who_raise_ticket')
    assigne = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True,blank=True,related_name='assigne_for_ticket')
    priority = models.CharField(choices=PRIORITY_CHOICE,max_length=50,default='medium')
    request_type = models.CharField(max_length=50,default='',null=True)
    resolve_status = models.CharField(choices=RESOLVE_CHOICE,max_length=50,default='open',null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    updated_by =  models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True,blank=True,related_name='updated_by')

