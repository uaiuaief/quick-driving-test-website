from . import models
from rest_framework import serializers


class CustomerSerializer(serializers.ModelSerializer):
    acceptable_time_ranges = serializers.TimeField

    class Meta:
        model = models.Customer
        depth = 1
        fields = [
                'driving_licence_number',
                'test_ref',
                'main_test_center',
                'recent_test_failure',
                'earliest_test_date',
                'latest_test_date',
                'info_validation',
                'acceptable_time_ranges',
                'last_crawled',
                'automatic_booking'
                ]


class TestCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestCenter
        fields = '__all__'
        depth = 1


class TimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AcceptableTimeRange
        fields = ['start_time', 'end_time']


class ProxySerializer(serializers.ModelSerializer):
    last_used = serializers.DateTimeField()

    class Meta:
        model = models.Proxy
        fields = ['ip', 'last_used', 'is_banned']



#class TestCenterSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = models.TestCenter
#        fields = '__all__'
#        depth = 1
#
