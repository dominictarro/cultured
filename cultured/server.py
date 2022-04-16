"""
Endpoints for contacting the site.
"""
from os.path import exists, join
import traceback

from .logs import logging
from .state import DailyMemeState, DailyMemeStateEncoder
from .updater import begin_daily_meme_state_updater
from flask import abort, request, send_from_directory, Flask
from flask.json import jsonify

logger = logging.getLogger('server')
app = Flask(__name__, static_folder='front-end')
app.json_encoder = DailyMemeStateEncoder
state = DailyMemeState(None, None)
updater = begin_daily_meme_state_updater(state)
# Ensure the state is loaded before the server actually loads
while state.memes is None:
    ...

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    try:
        logger.info(f"'{request.endpoint}' requested from '{request.remote_addr}' by agent '{request.user_agent}'")
        if path != '' and exists(join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, 'index.html')
    except Exception:
        logger.error(f"errored when serving {request.endpoint}: {traceback.format_exc()}")
        abort(500)

@app.route("/today", methods=['GET'])
def today():
    logger.info(f"'{request.endpoint}' requested from '{request.remote_addr}' by agent '{request.user_agent}'")
    return jsonify(state)
