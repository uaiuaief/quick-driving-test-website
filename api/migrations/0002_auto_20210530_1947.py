# Generated by Django 3.2.3 on 2021-05-30 19:47

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='last_crawled',
            field=models.TimeField(blank=True, default=datetime.datetime(2021, 5, 30, 19, 47, 23, 487859, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='proxy',
            name='last_used',
            field=models.TimeField(default=datetime.datetime(2021, 5, 30, 19, 47, 23, 492400, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='testcenter',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='testcenter',
            name='last_modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
