#!/bin/bash

# Install PostgreSQL, if not installed
is_postgresql_pre_installed=false
if [ -n "$(command -v psql)" ]; then
	is_postgresql_pre_installed=true
fi
if [[ $is_postgresql_pre_installed == false ]];
then
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    if [ -z "$(uname -a | grep Ubuntu)" ]; then
      echo "WARNING : [This operating system is not Ubuntu.] PostgreSQL installation may fail."
      echo "WARNING : [This operating system is not Ubuntu.] Find out how to install PostgreSQL."
    fi
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo apt-get update
    sudo apt-get -y install postgresql
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    brew install postgresql
  fi

  # Exit if last command execution failed.
  if [ $? -eq 0 ]; then
    echo "PostgreSQL successfully installed."
  else
    echo "OS not supported."
    exit 1
  fi
fi

if [ -z "$(service postgresql status | grep 'Active: active')" ]; then
  echo "Start service postgresql first."
  exit 1
fi

sql_temp_directory="$(echo ~postgres)/youtube-clone-tmp"
sudo mkdir $sql_temp_directory
sudo cp -r ./*.sql "${sql_temp_directory}/"
# move to postgres directory to disable permission denied message
cd ~postgres/

read -p "Enter new database name (youtube-clone): " new_db_name
new_db_name="${new_db_name:-youtube-clone}"


execute_as_admin=""
# set params for create/delete database
if [[ $is_postgresql_pre_installed == true ]]; then
  read -p "Enter database admin(A user with create db privileges) username (postgres):" db_admin_name
fi
db_admin_name="${db_admin_name:-postgres}"
execute_as_admin="sudo -u $db_admin_name"

# Create user
current_user=$(whoami)
read -p "Enter username of new database $new_db_name owner ($current_user): " db_owner_name
db_owner_name="${db_owner_name:-$current_user}"
is_current_user_exist=$($execute_as_admin psql -Atc "SELECT 'true' FROM pg_roles WHERE rolname='$current_user'")
if [ ! $is_current_user_exist ]; then
  echo "Create new user : $current_user"
  $execute_as_admin psql -c "CREATE USER $current_user;"
fi

if $execute_as_admin psql -lqt | cut -d \| -f 1 | grep -qw $new_db_name;
then 
  echo "DB named youtube-clone exists";
  read -p "Drop DB? [Y/N] (y):" answer
  answer="${answer:-y}"
  case $answer in
    y | Y )
      echo "Drop DB : $new_db_name";
      $execute_as_admin dropdb $new_db_name;;
    * ) exit 0;;
  esac
fi
echo "Create DB : $new_db_name"
$execute_as_admin createdb -O $db_owner_name $new_db_name

# Execute init.sql
$execute_as_admin psql -f "${sql_temp_directory}/init.sql" -d $new_db_name
# Execute use_auth0.sql
$execute_as_admin psql -f "${sql_temp_directory}/use_auth0.sql" -d $new_db_name

sudo rm -rf ~postgres/youtube-clone-tmp/