import time
import asyncio
from src.backend import settings
import socketio
import random
from selenium.webdriver.common.keys import Keys

sio = socketio.AsyncClient()
PORT = settings.Configuration.app['port']
HOST = settings.Configuration.app['host']
ISI = 3  # inter-stimulus-interval in seconds, will be replaced by message sent


@sio.event
async def connect():
    print('frontend simulator connected')


@sio.event
async def connect_error(e):
    print('Connection error:', e)


@sio.event
async def disconnect():
    print('frontend simulator disconnected')


# generate a random letter in the range x - y
def rand_letter(x='a', y='z'):
    return chr(random.randint(ord(x), ord(y)))


async def _frontend_simulator():
    """

    :return:
    """
    N = 8
    while True:
        await sio.sleep(ISI)
        dsi_message = ''
        for i in range(N):
            dsi_message += rand_letter()
        print('Frontend simulator sending message:', dsi_message)
        await sio.emit('forward_message', dsi_message, namespace='/caretaker')


async def frontend_simulator():
    await sio.connect(f'http://{HOST}:{PORT}', namespaces=['/', '/caretaker'])
    await sio.start_background_task(_frontend_simulator)
    await sio.wait()


if __name__ == '__main__':
    asyncio.run(frontend_simulator())
