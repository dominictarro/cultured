"""
"""
import logging
import logging.config
import time
import yaml

with open('logging_configuration.yml', 'r') as fo:
    logging_configuration = yaml.safe_load(fo)

logging.config.dictConfig(logging_configuration)
logging.Formatter.converter = time.gmtime
