"""
State of memes for the day.
"""
from dataclasses import dataclass
from datetime import datetime
from json import JSONEncoder
import traceback
from typing import Any
from zoneinfo import ZoneInfo

UTC = ZoneInfo('UTC')


@dataclass
class DailyMemeState:
    """Object sent to new users and returning users on a daily basis. Used to
    determine the meme & consequent solution within the client.

    Should be updated daily.

    `DailyMemeState.memes`
    A list of meme dictionaries containing all of the choices the client has.
    ```json
    [
        {
            "id": "181913649",
            "solution": ["Drake", "Hotline", "Bling"],
            "url": "https://i.imgflip.com/30b1gx.jpg",
            "width": 1200,
            "height": 1200
        },
        {
            "id": "87743020",
            "solution": ["Two", "Buttons"],
            "url": "https://i.imgflip.com/1g8my4.jpg",
            "width": 600,
            "height": 908,
        },
    ]
    ```
    """
    memes: list
    updated_at: datetime

    def update(self, memes: list):
        """Updates the `DailyMemeState` with the given values. 

        :param memes: List of meme dictionaries for the client to choose from.
        :type memes: list
        """
        self.memes = memes
        self.updated_at = datetime.utcnow().astimezone(UTC)


class DailyMemeStateEncoder(JSONEncoder):
    """Specialized encoder for converting `DailyMemeState` instances into a JSON type.
    """

    def default(self, o: Any):
        if isinstance(o, DailyMemeState):
            return {"choices": o.memes, "updatedAt": o.updated_at.isoformat()}
        # Let the base class default method raise the TypeError
        return JSONEncoder.default(self, o)
