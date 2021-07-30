import datetime
from django.db import models
from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth.base_user import BaseUserManager


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)

        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('date joined'), auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Profile(BaseModel):
    user = models.OneToOneField(
            User, 
            on_delete=models.CASCADE,
    )

    driving_licence_number = models.CharField(
            max_length=30, 
            #validators=[MinLengthValidator(16)]
    )

    test_ref = models.CharField(max_length=30)

    theory_test_number = models.CharField(
            null=True,
            blank=True,
            max_length=30, 
    )
    
    test_centers = models.ManyToManyField('TestCenter', blank=True)

    recent_test_failure = models.DateField(null=True, blank=True)

    earliest_test_date = models.DateField(default=timezone.now, blank=True)
    latest_test_date = models.DateField(null=True, blank=True)

    earliest_time = models.TimeField(
            blank=True, default=datetime.datetime.strptime("07:00", "%H:%M"))
    latest_time = models.TimeField(
            blank=True, default=datetime.datetime.strptime("18:00", "%H:%M"))

    last_crawled = models.DateTimeField(blank=True, default=timezone.now)
    automatic_booking = models.BooleanField(default=False)

    info_validation = models.CharField(
            max_length=20,
            choices=[
                ('unchecked', 'unchecked'),
                ('valid', 'valid'),
                ('invalid', 'invalid')
            ],
            default='unchecked'
    )

    current_test_date = models.DateTimeField(null=True, blank=True)
    test_booked = models.BooleanField(default=False)

    first_name = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(1)]
    )

    last_name = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(1)]
    )

    mobile_number = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(8)],
            blank=True,
            null=True
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

        if self.earliest_time and self.latest_time:
            if self.earliest_time > self.latest_time:
                errors.append("Start time can't be after end time") 

        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return f'{self.get_full_name()} - {self.info_validation} - {"BOOKED" if self.test_booked else ""}'

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'


class TestCenter(BaseModel):
    name = models.CharField(max_length=150)
    #customers = models.ManyToManyField('User', blank=True)

    def __str__(self):
        return self.name


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
    ip = models.CharField(max_length=80, unique=True)
    last_used = models.DateTimeField(default=timezone.now)
    is_banned = models.BooleanField(default=False)
    use_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.ip}  |  {format(self.last_used, '%d/%m, %H:%M:%S' )}  {'|  Banned' if self.is_banned else ''}  |  use count: {self.use_count}"


def get_expiration_time():
    return timezone.now() + datetime.timedelta(minutes=60)


class Token(BaseModel):
    token_hash = models.CharField(max_length=32, unique=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    expiration = models.DateTimeField(
            default=get_expiration_time(),
            blank=True
            )
    
    def __str__(self):
        return self.user.email
    
    def is_expired(self):
        return self.expiration < timezone.now()
