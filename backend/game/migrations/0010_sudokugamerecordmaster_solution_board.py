# Generated by Django 2.2.5 on 2019-09-27 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0009_sudokugamerecordmaster'),
    ]

    operations = [
        migrations.AddField(
            model_name='sudokugamerecordmaster',
            name='solution_board',
            field=models.CharField(default='', max_length=81),
            preserve_default=False,
        ),
    ]
