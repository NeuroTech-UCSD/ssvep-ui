import yaml
from dotenv import load_dotenv
import os

load_dotenv()


class Configuration:
    app = {}
    app['port'] = os.getenv('APP_PORT') if os.getenv('APP_PORT') else 4002
    app['host'] = os.getenv('REACT_APP_HOST') if os.getenv('REACT_APP_HOST') else '192.168.156.132'

    def __init__(self):
        pass
