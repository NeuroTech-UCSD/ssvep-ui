import yaml


class Configuration:
    app = {}
    with open("config.yaml", "r") as stream:
        try:
            config = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
    app['port'] = config['application']['port']

    def __init__(self):
        pass
