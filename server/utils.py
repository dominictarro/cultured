"""
Generic utility methods used by the server.
"""
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

US_EASTERN = ZoneInfo('US/Eastern')


def time_until_end_of_day(tz: ZoneInfo = US_EASTERN) -> int:
    """Returns the number of seconds until midnight.

    :param tz: TimeZone to find remaining seconds for, defaults to ZoneInfo('US/Eastern')
    :type tz: ZoneInfo, optional
    :return: Seconds until end of day
    :rtype: int
    """
    now = datetime.now(tz)
    tomorrow = datetime(now.year, now.month, now.day, tzinfo=tz) + timedelta(1)
    return abs(tomorrow - now).seconds
