# Generated by Django 3.2.3 on 2021-06-23 00:59

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_token_expiration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='test_ref',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='token',
            name='expiration',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 6, 23, 1, 59, 10, 117150, tzinfo=utc)),
        ),
    ]
