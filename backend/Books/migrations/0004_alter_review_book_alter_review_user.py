# Generated by Django 5.0.6 on 2024-06-21 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Books', '0003_alter_review_book'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='book',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='review',
            name='user',
            field=models.IntegerField(),
        ),
    ]