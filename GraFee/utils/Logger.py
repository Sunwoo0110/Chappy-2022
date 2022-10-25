'''
ref: https://docs.python.org/ko/3/howto/logging.html
'''

import logging

logger = logging.getLogger()

# logger.setLevel(logging.INFO)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s')

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

file_handler = logging.FileHandler('test.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
