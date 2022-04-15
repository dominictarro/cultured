"""
Endpoints for contacting the site.
"""
from .state import DailyMemeState, DailyMemeStateEncoder
from .updater import begin_daily_meme_state_updater
from flask import Flask
from flask.json import jsonify


app = Flask(__name__)
app.json_encoder = DailyMemeStateEncoder
state = DailyMemeState(None, None)
updater = begin_daily_meme_state_updater(state)
# Ensure the state is loaded before the server actually loads
while state.memes is None:
    ...

@app.route("/index")
@app.route("/")
def index():
    return ""

@app.route("/today")
def today():
    return jsonify(state)

