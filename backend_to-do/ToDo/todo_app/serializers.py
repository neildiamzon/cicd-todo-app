from rest_framework import serializers
from .models import TodoCard

class TodoCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoCard
        fields = '__all__'
