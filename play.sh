#!/bin/bash

source ./venv/bin/activate
export FLASK_APP=cultured.server
export FLASK_ENV=development


# check for flask process
procs=`ps -eaf | grep ".*/cultured/.*/[f]lask run$"`
if [ -z "$procs" ]; then
    # flask process does not exist
    flask run &
fi
echo "Flask already running"
echo -e "$procs"
cd front-end && npm start
