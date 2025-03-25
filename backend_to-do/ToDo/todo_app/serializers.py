from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TodoCard

class TodoCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoCard
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
