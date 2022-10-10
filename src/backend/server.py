import sys
import socketio
from aiohttp import web
from datetime import datetime
import settings


class DSI(socketio.AsyncNamespace):

    def on_connect(self, sid, environ):
        print('dsi connected')

    def on_disconnect(self, sid):
        print('dsi disconnected')

    async def on_forward_message(self, sid, data):
        message = data
        print('Received DSI message:', data)
        await self.emit('get_message', message, namespace='/caretaker')


class Caretaker(socketio.AsyncNamespace):

    def on_connect(self, sid, environ):
        print('caretaker connected')

    def on_disconnect(self, sid):
        print('cartaker disconnected')

    async def on_forward_message(self, sid, data):
        message = data
        print('Received caretaker message:', message)
        # await self.emit('get prediction', prediction, namespace='/caretaker')


class Server:
    def __init__(self):
        # basic AsyncServer setup
        self.sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins="*")
        self.app = web.Application()
        self.sio.attach(self.app)
        self.sio.register_namespace(DSI('/dsi'))
        self.sio.register_namespace(Caretaker('/caretaker'))
        self.port = settings.Configuration.app['port']
        self.config = {'patient_id': 12345, 'date': None}

    async def get_config(self, sid):
        return self.config

    async def display_config(self, sid, data):
        print(data)

    def start_server(self):
        self.sio.on('get config', self.get_config)
        self.sio.on('form submitted', self.display_config)
        web.run_app(self.app, host='0.0.0.0', port=self.port)  # we're using local host here


if __name__ == '__main__':
    server = Server()
    server.start_server()
