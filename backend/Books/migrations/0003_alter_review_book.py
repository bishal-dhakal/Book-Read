# Generated by Django 5.0.6 on 2024-06-21 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Books', '0002_alter_book_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='book',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
