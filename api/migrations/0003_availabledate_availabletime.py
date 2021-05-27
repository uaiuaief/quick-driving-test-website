# Generated by Django 3.2.3 on 2021-05-24 00:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210523_1526'),
    ]

    operations = [
        migrations.CreateModel(
            name='AvailableDate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latest_test_date', models.DateField()),
                ('test_center', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='available_date', to='api.testcenter')),
            ],
        ),
        migrations.CreateModel(
            name='AvailableTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TimeField()),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='available_time', to='api.availabledate')),
            ],
        ),
    ]
