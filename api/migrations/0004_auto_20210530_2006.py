# Generated by Django 3.2.3 on 2021-05-30 20:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210530_1947'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='last_crawled',
            field=models.TimeField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='proxy',
            name='last_used',
            field=models.TimeField(default=datetime.datetime.now),
        ),
    ]
