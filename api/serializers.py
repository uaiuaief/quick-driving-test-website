from . import models
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        depth = 1
        fields = [
                'email',
                'profile',
                ]

        #        'driving_licence_number',
        #        'theory_test_number',
        #        'test_ref',
        #        'main_test_center',
        #        'recent_test_failure',
        #        'earliest_test_date',
        #        'latest_test_date',
        #        'earliest_time',
        #        'latest_time',
        #        'info_validation',
        #        'acceptable_time_ranges',
        #        'last_crawled',
        #        'automatic_booking',
        #        'first_name',
        #        'last_name',
        #        'mobile_number',
        #        ]


class TestCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestCenter
        fields = '__all__'
        depth = 1


class ProxySerializer(serializers.ModelSerializer):
    last_used = serializers.DateTimeField()

    class Meta:
        model = models.Proxy
        fields = ['ip', 'last_used', 'is_banned']

