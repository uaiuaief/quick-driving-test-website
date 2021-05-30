import datetime
from django.db import models
from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError
from django.utils import timezone


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class TestCenter(BaseModel):
    name = models.CharField(max_length=150)
    customers = models.ManyToManyField('Customer', blank=True)

    created_at = models.DateField(auto_now_add=True)
    last_modified = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Customer(BaseModel):
    driving_licence_number = models.CharField(
            primary_key=True,
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

    recent_test_failure = models.DateField(null=True, blank=True)
    earliest_test_date = models.DateField(default=timezone.now)
    latest_test_date = models.DateField(null=True, blank=True)
    last_crawled = models.TimeField(null=True, blank=True)

    info_validation = models.CharField(
            max_length=20,
            choices=[
                ('unchecked', 'unchecked'),
                ('valid', 'valid'),
                ('invalid', 'invalid')
            ],
            default='unchecked'
    )

    def clean(self):
        errors = []
        if self.recent_test_failure and self.recent_test_failure > datetime.date.today():
            errors.append("Recent failure date can't be after the current day") 
        if self.latest_test_date:
            if self.latest_test_date < datetime.date.today():
                errors.append("Latest test date can't be before the current day") 
            if self.latest_test_date < self.earliest_test_date:
                errors.append("Latest test date can't be before the earlist test date") 

        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return self.driving_licence_number


class AcceptableTimeRange(BaseModel):
    start_time = models.TimeField()
    end_time = models.TimeField()
    customer = models.ForeignKey(
            'Customer',
            on_delete=models.CASCADE,
            related_name='acceptable_time_ranges'
    )

    def clean(self):
        if not (self.start_time or self.end_time):
            return
        if self.start_time > self.end_time:
            raise ValidationError("Start time can't be after end time")

    def __str__(self):
        return f"{self.customer} -> {self.start_time} ~ {self.end_time}"


class AvailableDate(BaseModel):
    date = models.DateField()
    test_center = models.ForeignKey(
            'TestCenter',
            on_delete=models.CASCADE,
            related_name='available_dates'
    )

    def __str__(self):
        return f"{self.test_center} - {self.date}"


class AvailableTime(BaseModel):
    time = models.TimeField()
    date = models.ForeignKey(
            'AvailableDate',
            on_delete=models.CASCADE,
            related_name='available_time'
    )

    def __str__(self):
        return f"{self.date} - {self.time}"


class Proxy(BaseModel):
    ip = models.CharField(max_length=30, unique=True)
    last_used = models.TimeField(null=True, blank=True)
    is_banned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.ip} - {self.last_used}"
