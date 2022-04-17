#!/bin/bash

source ./venv/bin/activate
export FLASK_APP=cultured.server
export FLASK_ENV=development

flask run &
cd front-end && npm start
