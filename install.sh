#!/bin/bash

py3_10=`python3.10 -m pip --version 2> /dev/null | grep "python 3\.10"`

if [ -z "$py3_10" ]; then
    echo "It seems Python 3.10 is not installed on your machine or added to your PATH variable."
    exit 1
fi

echo "Creating Python virtual environment"
python3.10 -m venv venv

if ! [ $? -eq 0 ]; then
    echo "Failed to create Python virtual environment"
    exit 1
fi

echo "Installing Python packages"
./venv/bin/python3.10 -m pip install -r requirements.txt

if ! [ $? -eq 0 ]; then
    echo "Failed to install Python packages"
    exit 1
fi

echo
echo Done!
echo Run \'play.sh\' to start the game