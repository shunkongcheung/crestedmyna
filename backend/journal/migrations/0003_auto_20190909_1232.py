# Generated by Django 2.2.5 on 2019-09-09 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0002_journalmaster_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journalmaster',
            name='images',
            field=models.ManyToManyField(blank=True, to='general.MediaMaster'),
        ),
    ]