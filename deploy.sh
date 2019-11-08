#!/bin/bash

be_dir=~/casualapp/backend
fe_dir=~/casualapp/frontend
dest_namedir=/usr/local/casualapp/$1
venv_dir=/usr/local/casualapp/venv

# get updated version
git pull

# build frontend
npm install --prefix $fe_dir
npm run build --prefix $fe_dir

# copy index.html into backend templates
mkdir $be_dir/base/templates && rm -r $be_dir/base/templates/*
rsync -av $fe_dir/build/index.html $be_dir/base/templates/.

# copy static assets into backend statics
mkdir $be_dir/base/static && rm -r $be_dir/base/static/*
rsync -av --exclude='static' $fe_dir/build/* $be_dir/base/static/.
rsync -av $fe_dir/build/static/* $be_dir/base/static/.

# collect static
mkdir $be_dir/static && rm -r $be_dir/static
source $venv_dir/bin/activate
python $be_dir/manage.py collectstatic --noinput
deactivate

# copy as a version keeping
cp -r $be_dir $dest_namedir
ln -sfn $dest_namedir /usr/local/casualapp/active

# restart application
bash /usr/local/casualapp/active/startup.sh
