# Generated by Django 3.2.3 on 2021-06-08 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_customer_theory_test_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='driving_licence_number',
            field=models.CharField(max_length=30, primary_key=True, serialize=False),
        ),
    ]
