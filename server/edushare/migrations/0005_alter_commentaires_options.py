# Generated by Django 4.2.4 on 2023-08-27 00:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('edushare', '0004_commentaires'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='commentaires',
            options={'ordering': ['-created_at']},
        ),
    ]