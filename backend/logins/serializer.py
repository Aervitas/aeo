from rest_framework import serializers
from .models import CalendarEvent, login

class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = '__all__'

class LoginSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)

    class Meta:
        model = login
        fields = ['title', 'username', 'email', 'groups', 'password']