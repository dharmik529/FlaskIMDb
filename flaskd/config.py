import json

with open('config.json') as config_file:
    config = json.load(config_file)

class Config:
    IMDbKey = config.get('IMDbKey')
    LogUser = config.get('LogUser')
    LogPass = config.get('LogPass')
    BitlyGuid = config.get('BitlyGuid')
    BitlyAT = config.get('BitlyAT')
