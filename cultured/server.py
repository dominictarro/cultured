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
from flask_cors import CORS, cross_origin

logger = logging.getLogger('server')
app = Flask(__name__, static_folder='front-end/build')
app.json_encoder = DailyMemeStateEncoder
#cors = CORS(app)

state = DailyMemeState(None, None)
updater = begin_daily_meme_state_updater(state, 60)
# Ensure the state is loaded before the server actually loads
while state.memes is None:
    ...

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
##@cross_origin()
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
@cross_origin()
def today():
    logger.info(f"'{request.endpoint}' requested from '{request.remote_addr}' by agent '{request.user_agent}'")
    return jsonify(state)
