"""
Endpoints for contacting the site.
"""
from .logs import logging
from .state import DailyMemeState, DailyMemeStateEncoder
from .updater import begin_daily_meme_state_updater
from flask import request, Flask
from flask.json import jsonify

logger = logging.getLogger('server')
app = Flask(__name__)
app.json_encoder = DailyMemeStateEncoder
state = DailyMemeState(None, None)
updater = begin_daily_meme_state_updater(state)
# Ensure the state is loaded before the server actually loads
while state.memes is None:
    ...

@app.route("/")
def index():
    logger.info(f"'{request.endpoint}' requested from '{request.remote_addr}' by agent '{request.user_agent}'")
    return ""

@app.route("/today", methods=['GET'])
def today():
    logger.info(f"'{request.endpoint}' requested from '{request.remote_addr}' by agent '{request.user_agent}'")
    return jsonify(state)
