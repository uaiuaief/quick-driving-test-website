from django.contrib import admin
from .models import Customer, TestCenter, AcceptableTimeRange

# Register your models here.
admin.site.register(Customer)
admin.site.register(TestCenter)
admin.site.register(AcceptableTimeRange)
