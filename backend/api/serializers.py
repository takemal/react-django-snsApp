from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from core.models import Profile, FriendRequest
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'nickName','user', 'created_at', 'img')
        # Viewでログインユーザを自動でuserに割り当てるため、読込のみ可
        extra_kwargs = {'user': {'read_only': True}}

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('id','toUser','fromUser','approved')
        extra_kwargs = {'fromUser': {'read_only': True}}