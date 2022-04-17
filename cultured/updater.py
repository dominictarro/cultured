"""
A thread initializing command for beginning daily updates to the MemeState.
"""
from typing import Dict, List, Union
import requests
import threading
import time
import traceback

from .logs import logging
from .state import DailyMemeState
from .utils import time_until_end_of_day

logger = logging.getLogger('updater')


def get_memes_from_api() -> dict:
    """Makes an HTTP GET request to https://api.imgflip.com/get_memes
    Raises for status. If no error, returns the result in a dictionary.
    """
    headers = {
        'Accept-Charset': 'utf-8',
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US'
    }
    r: requests.Response = requests.get(
        url="https://api.imgflip.com/get_memes",
        headers=headers
    )
    r.raise_for_status()
    return r.json()

def format_memes_from_api_result(api_result: dict) -> list:
    """Formats the meme documents in the result.
    :param api_result: JSON result from the daily meme API.
    :type api_result: dict
    :return: List of formatted meme choice dictionaries
    :rtype: list

    `api_result` should be formatted like
    ```json
    {
        "success": true,
        "data": {
            "memes": [
                {
                    "id": "181913649",
                    "name": "Drake Hotline Bling",
                    "url": "https://i.imgflip.com/30b1gx.jpg",
                    "width": 1200,
                    "height": 1200,
                    "box_count": 2
                },
                {
                    "id": "87743020",
                    "name": "Two Buttons",
                    "url": "https://i.imgflip.com/1g8my4.jpg",
                    "width": 600,
                    "height": 908,
                    "box_count": 3
                },
            ]
        }
    }
    ```

    While the output ought to be like
    ```json
    [
        {
            "id": "181913649",
            "solution": ["Drake", "Hotline", "Bling"],
            "url": "https://i.imgflip.com/30b1gx.jpg"
        },
        {
            "id": "87743020",
            "solution": ["Two", "Buttons"],
            "url": "https://i.imgflip.com/1g8my4.jpg"
        },
    ]
    ```

    """
    # In case this gets re-run on the same dictionary,
    # pops won't apply to the original
    api_result = api_result.copy()
    memes: List[dict] = []

    for doc in api_result['data']['memes']:
        try:
            doc: Dict[str, Union[int, str]]
            solution: List[str] = doc.pop('name').split()
            doc['solution'] = solution

            # Don't care about number of text boxes the meme uses
            doc.pop('box_count')
            doc.pop('width')
            doc.pop('height')
            memes.append(doc)
        except Exception:
            logger.error(f"could not format meme document: {traceback.format_exc()}")

    return memes

def update_meme_state_from_api(state: DailyMemeState) -> bool:
    """Queries the API and updates the state object with the query's formatted
    result.

    :param state: State object to update
    :type state: DailyMemeState
    :return: Successful update
    :rtype: Boolean
    """
    try:
        result = get_memes_from_api()
    except Exception:
        logger.critical(f"api provided no dank memes: {traceback.format_exc()}")
        return False

    try:
        memes = format_memes_from_api_result(result)
    except Exception:
        logger.critical(f"failed to format memes: {traceback.format_exc()}")
        return False

    state.update(memes)
    return True

def midnight_update_loop(state: DailyMemeState, retry_wait: Union[float, int]):
    """Forever updates the `DailyMemeState` object at midnight.

    :param state: State object to update daily at midnight
    :type state: DailyMemeState
    :param retry_wait: Seconds to sleep after a failed state update
    :type retry_wait: float or int
    """
    while True:
        try:
            logging.info("updating meme state")
            if update_meme_state_from_api(state):
                sleep_duration = time_until_end_of_day()
                time.sleep(sleep_duration)
                # skip retry
                continue
        except Exception:
            logger.critical(f"unexpected error during update: {traceback.format_exc()}")
        time.sleep(retry_wait)
        logger.info("retrying update")

def begin_daily_meme_state_updater(state: DailyMemeState, retry_wait: Union[float, int]) -> threading.Thread:
    """Begins a thread that updates the state object every day at midnight.

    :param state: State object to be updated
    :type state: DailyMemeState
    :param retry_wait: Seconds to sleep after a failed update
    :type retry_wait: float or int
    :return: Updater thread
    :rtype: threading.Thread
    """
    state_updater_thread = threading.Thread(
        target=midnight_update_loop,
        args=(state,retry_wait),
        name="StateUpdaterThread",
        daemon=True
    )
    state_updater_thread.start()
    return state_updater_thread
