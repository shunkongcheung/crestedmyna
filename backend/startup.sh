#!/bin/bash
homedir=/usr/local/casualapp
logdir=/var/log/casualapp

pkill -9 celery
pkill -9 uwsgi

source $homedir/venv/bin/activate

cd $homedir/active
uwsgi --ini uwsgi.ini &
celery -A backend beat -l info --scheduler  django_celery_beat.schedulers:DatabaseScheduler -f $logdir/beat.log &
celery -A backend worker -l info -f $logdir/celery.log &
celery flower -A backend --port=5555 -f $logdir/flower.log &

deactivate
