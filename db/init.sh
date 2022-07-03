#!/bin/bash

# Create DataBase Named $new_db_name
new_db_name="youtube-clone"

if psql -lqt | cut -d \| -f 1 | grep -qw $new_db_name;
then 
  echo "DB named youtube-clone exists";
  read -p "Drop DB? [Y/N] (y):" answer
  case $answer in
    y | Y )
      echo "Drop DB : $new_db_name";
      dropdb $new_db_name;;
    * ) exit 0;;
  esac
fi
echo "Create DB : $new_db_name"
createdb $new_db_name

# Execute init.sql
psql -f ./init.sql -d $new_db_name