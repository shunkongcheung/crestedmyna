# Generated by Django 2.2.5 on 2019-10-05 13:56

from django.db import migrations, models
import django.db.models.deletion

from stock.models import StockSectorMaster

undetermined_sector_master = StockSectorMaster.objects.get(name='Undetermined')


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0013_create_stock_sectors'),
    ]

    operations = [
        migrations.AddField(
            model_name='stockmaster',
            name='sector',
            field=models.ForeignKey(default=undetermined_sector_master.pk,
                                    on_delete=django.db.models.deletion.CASCADE,
                                    related_name='stock_masters',
                                    to='stock.StockSectorMaster'),
            preserve_default=False,
        ),
    ]