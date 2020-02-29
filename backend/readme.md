# 1 SETTING UP SERVER

## 1.1 INSTALL UBUNTU ON DIGITAL OCEAN

## 1.2 CREATE SECURITY GROUP
* ssh
* http

## 1.2 INSTALLATION

```
sudo apt-get update
sudo apt-get install python3.7 nginx git python3-pip libpq-dev postgresql
sudo pip3 install virtualenv uwsgi
sudo apt install unzip

# timezone
cd /usr/share/zoneinfo
tzselect

```

## 1.3 DATABASE

```
sudo -u postgres psql

postgres=# CREATE database casualapp_db;
CREATE DATABASE
postgres=# CREATE user casualapp_dbuser with password 'password';
CREATE ROLE
postgres=# ALTER role casualapp_dbuser set client_encoding to 'utf8';
ALTER ROLE
postgres=# ALTER role casualapp_dbuser set default_transaction_isolation to 'read committed';
ALTER ROLE
postgres=# ALTER role casualapp_dbuser set timezone to 'UTC';
ALTER ROLE
postgres=# GRANT all privileges on database casualapp_db to casualapp_dbuser;
GRANT
postgres=# \q
```

## 1.4 DIRECTORY SETUP

```
sudo mkdir /usr/local/casualapp
sudo chown ubuntu.ubuntu /usr/local/casualapp
virtualenv /usr/local/casualapp/venv

sudo mkdir /var/log/casualapp
sudo chown -R ubuntu.ubuntu /var/log/casualapp/
```

## 1.5 DOMAIN AND CERTIFICATE

https://www.domain.com/

manage domain -> manage DNS -> add record

https://letsencrypt.org/

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot python-certbot-nginx
sudo certbot --nginx
```

## 1.6 PYTHON SETUP


```
source venv/bin/activate
```

## 1.7 RABBITMQ


```
sudo apt-get update
sudo apt-get upgrade

# installing erl
wget -O- https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo apt-key add -
echo "deb https://packages.erlang-solutions.com/ubuntu bionic contrib" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
sudo apt update
sudo apt -y install erlang

# installation
echo "deb https://dl.bintray.com/rabbitmq/debian xenial main" | sudo tee /etc/apt/sources.list.d/bintray.rabbitmq.list
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y rabbitmq-server

# !!!! if failed
sudo find / -name mnesia
```

## 1.8 USER SETUP


```
# login as root
adduser shun
usermod -aG sudo shun
rsync --archive --chown=shun:shun ~/.ssh /home/shun
```

# 2.0 ROUTINE

### 2.1 DATABASE BACKUP


```
### once
sudo chown postgres.postgres /usr/local/casualapp/db_backups


### everytime
sudo su postgres
pg_dump -U postgres -F t casualapp_db > /usr/local/casualapp/db_backups/20190925.tar
```