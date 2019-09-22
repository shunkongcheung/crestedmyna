# Generated by Django 2.2.5 on 2019-09-20 12:36

from django.db import migrations


def create_stock_profile(*args):
    print('create_stock_profile: begin')
    from django.contrib.auth.models import User
    from stock.models import StockProfile

    users = User.objects.all()
    user_count = users.count()
    print(f'create_stock_profile: total user {user_count}')

    for idx, user in enumerate(users):
        username = user.username
        object, created = StockProfile.objects.get_or_create(
            enable=True,
            created_by=user,
            defaults={'created_by': user, 'name': username}
        )
        if created:
            msg = f'create_stock_profile: {idx}/{user_count} created for {username}'
        else:
            msg = f'create_stock_profile: {idx}/{user_count} {username} had a profile'
        print(msg)

    print('create_stock_profile: end')


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0004_stockprofile'),
    ]

    operations = [
        migrations.RunPython(
            create_stock_profile,
            migrations.RunPython.noop
        )
    ]