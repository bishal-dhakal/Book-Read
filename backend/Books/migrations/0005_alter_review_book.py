# Generated by Django 5.0.6 on 2024-06-21 17:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Books', '0004_alter_review_book_alter_review_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Books.book'),
        ),
    ]
