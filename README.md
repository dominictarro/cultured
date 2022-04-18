![[A cultured citizen](cultured.day)](./design/moostache.png)

# cultured.day

[![Site](https://img.shields.io/badge/Play-https%3A%2F%2Fcultured.day-green)](https://cultured.day)
![Version](https://img.shields.io/badge/Latest-v0.0.1-informational)
[![Python](https://img.shields.io/badge/Python-3.9+-important)](https://www.python.org/downloads/release/python-3100/)

Some claim they're meme connoisseurs. [cultured.day](http://cultured.day) is the true test.

## How to Play

Everyday you receive a new meme template and a word bank. Guess the name of the
meme template in 6 tries.

## About

Meme templates are acquired everyday from [imgflip](https://api.imgflip.com/)'s top 100 latest templates of the last 30 days.

## Play Locally

### From Shell

#### Requirements

- [Python 3.10](https://www.python.org/downloads/release/python-3100/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

1. Ensure you have Python 3.10 and npm installed and in your system path ([Python](https://www.tutorialspoint.com/python/python_environment.htm), [npm](https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm)).
2. Run `install.sh`
3. Run `play.sh`
4. Go to [http://localhost:3000](http://localhost:3000)

### From Docker

Depending on cached images and network speed, this may take a few minutes.

1. Run `docker-compose build` if you haven't already.
2. Run `docker-compose up -d`
3. Go to [http://localhost:3000](http://localhost:3000)
