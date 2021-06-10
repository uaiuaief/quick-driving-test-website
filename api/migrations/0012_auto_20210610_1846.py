# Generated by Django 3.2.3 on 2021-06-10 18:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_customer_driving_licence_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='earliest_time',
            field=models.TimeField(blank=True, default=datetime.datetime(1900, 1, 1, 7, 0)),
        ),
        migrations.AddField(
            model_name='customer',
            name='latest_time',
            field=models.TimeField(blank=True, default=datetime.datetime(1900, 1, 1, 18, 0)),
        ),
        migrations.DeleteModel(
            name='AcceptableTimeRange',
        ),
    ]