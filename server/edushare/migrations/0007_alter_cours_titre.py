# Generated by Django 4.2.4 on 2023-08-29 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edushare', '0006_cours_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cours',
            name='titre',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
