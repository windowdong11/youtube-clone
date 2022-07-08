#!/bin/bash

# Install PostgreSQL, if not installed
is_postgresql_pre_installed=false
if [ -n "$(command -v psql)" ]; then
	is_postgresql_pre_installed=true
fi
if [[ $is_postgresql_pre_installed == false ]];
then
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo apt-get update
    sudo apt-get -y install postgresql
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    brew install postgresql
  else
    echo "OS not supported."
    exit 0
  fi
fi

service postgresql start

cur_dir=$(pwd)
cd ~postgres/

read -p "Enter new database name (youtube-clone): " new_db_name
new_db_name="${new_db_name:-youtube-clone}"

execute_as_postgres=""
# set params for create/delete database
if [[ $is_postgresql_pre_installed == true ]]; then
  read -p "Enter database creator username (postgres): " db_creator_name
fi
if [ ! $db_creator_name ]; then
  execute_as_postgres="sudo -u postgres"
fi
db_creator_name="${db_creator_name:-postgres}"

if $execute_as_postgres psql -lqt | cut -d \| -f 1 | grep -qw $new_db_name;
then 
  echo "DB named youtube-clone exists";
  read -p "Drop DB? [Y/N] (y):" answer
  answer="${answer:-y}"
  case $answer in
    y | Y )
      echo "Drop DB : $new_db_name";
      $execute_as_postgres dropdb $new_db_name;;
    * ) exit 0;;
  esac
fi
echo "Create DB : $new_db_name"
$execute_as_postgres createdb $new_db_name

# Execute init.sql
$execute_as_postgres psql -f $cur_dir/init.sql -d $new_db_name
# Execute use_auth0.sql
$execute_as_postgres psql -f $cur_dir/use_auth0.sql -d $new_db_name