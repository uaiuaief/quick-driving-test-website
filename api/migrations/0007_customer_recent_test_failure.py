# Generated by Django 3.2.3 on 2021-05-26 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_customer_earliest_test_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='recent_test_failure',
            field=models.DateField(null=True),
        ),
    ]
