# Generated by Django 3.2.3 on 2021-05-24 00:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_availabledate_test_center'),
    ]

    operations = [
        migrations.RenameField(
            model_name='availabledate',
            old_name='latest_test_date',
            new_name='date',
        ),
    ]
