from django.db import models
from django.core.validators import MinLengthValidator


class TestCenter(models.Model):
    name = models.CharField(max_length=150)
    customers = models.ManyToManyField('Customer', blank=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    driving_licence_number = models.CharField(
            max_length=16, 
            validators=[MinLengthValidator(16)]
    )

    test_ref = models.CharField(
            max_length=8,
            validators=[MinLengthValidator(8)]
    )

    main_test_center = models.ForeignKey(
            'TestCenter',
            on_delete=models.PROTECT
    )

    earliest_test_date = models.DateField(blank=True)
    latest_test_date = models.DateField()

    def __str__(self):
        return self.driving_licence_number

class AcceptableTimeRange(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    customer = models.ForeignKey(
            'Customer',
            on_delete=models.CASCADE,
            related_name='acceptable_time_ranges'
    )

