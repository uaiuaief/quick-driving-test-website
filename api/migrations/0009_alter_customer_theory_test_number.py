# Generated by Django 3.2.3 on 2021-06-08 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210608_2033'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='theory_test_number',
            field=models.CharField(max_length=16, null=True),
        ),
    ]