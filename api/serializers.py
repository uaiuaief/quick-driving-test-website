from . import models
from rest_framework import serializers



class TestCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestCenter
        fields = '__all__'
        depth = 1


class ProfileSerializer(serializers.ModelSerializer):
    main_test_center = TestCenterSerializer()

    class Meta:
        model = models.Profile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = models.User
        depth = 1
        fields = [
                'id',
                'email',
                'profile',
                ]


class ProxySerializer(serializers.ModelSerializer):
    last_used = serializers.DateTimeField()

    class Meta:
        model = models.Proxy
        fields = ['ip', 'last_used', 'is_banned']

