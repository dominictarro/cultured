FROM python:3.10.4-alpine3.15

WORKDIR /app
COPY . /app/

RUN python3.10 -m pip install -r requirements.txt

CMD [ "python3.10", "wsgi.py" ]
