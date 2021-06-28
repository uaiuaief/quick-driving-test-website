from . import models
from rest_framework import serializers



class TestCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestCenter
        fields = '__all__'
        depth = 1


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        #fields = '__all__'
        fields = [
                'first_name',
                'last_name',
                'mobile_number',
                'driving_licence_number',
                'test_ref',
                'theory_test_number',
                'test_centers',
                'recent_test_failure',
                'earliest_test_date',
                'latest_test_date',
                'earliest_time',
                'latest_time',
                'last_crawled',
                'automatic_booking',
                'test_booked',
                'current_test_date',
                'info_validation',
        ]

        depth = 1

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

