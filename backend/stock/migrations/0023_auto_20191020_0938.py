# Generated by Django 2.2.5 on 2019-10-20 01:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0022_stockccassandpricesummarydetail'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='stockccassandpricesummarydetail',
            unique_together={('detail_date', 'stock_code')},
        ),
    ]