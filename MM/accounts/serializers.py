from dataclasses import fields
from rest_framework import serializers
from .models import *



class UserSerialize(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'user_name', 'type', 'is_superuser', 'is_active', 'last_login', 'date_joined']


class UserLoginSerialize(serializers.ModelSerializer):
    label = serializers.CharField(source = 'user_name')
    class Meta:
        model = User
        fields = ['id', 'label']