from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Customer)
admin.site.register(models.TestCenter)
admin.site.register(models.AcceptableTimeRange)
admin.site.register(models.AvailableDate)
admin.site.register(models.AvailableTime)
