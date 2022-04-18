FROM node:13.12.0-alpine

WORKDIR /app
ENV PATH /app/mode_modules/.bin:$PATH

COPY front-end/package.json /app/
COPY front-end/package-lock.json /app/

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY front-end/ /app/

CMD [ "npm", "start" ]
