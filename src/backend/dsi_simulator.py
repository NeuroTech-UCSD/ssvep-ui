import time
import asyncio
import settings
import socketio
import random
from selenium.webdriver.common.keys import Keys

sio = socketio.AsyncClient()
PORT = settings.Configuration.app['port']
ISI = 3  # inter-stimulus-interval in seconds


@sio.event
async def connect():
    print('dsi connected')


@sio.event
async def connect_error(e):
    print('Connection error:', e)


@sio.event
async def disconnect():
    print('dsi disconnected')


# generate a random letter in the range x - y
def rand_letter(x='a', y='z'):
    return chr(random.randint(ord(x), ord(y)))


async def _dsi_simulator(include_enter=True):
    """

    :param include_enter: whether to include enter key every N characters, N is hard set in the code
    :return:
    """
    N = 5
    count = 1
    while True:
        await sio.sleep(ISI)
        if include_enter:
            if count < N:
                count += 1
                prediction = rand_letter()
            else:
                prediction = '\n'
                count = 1
        else:
            prediction = rand_letter()
        print('Sending prediction:', prediction)
        await sio.emit('forward_prediction', prediction, namespace='/dsi')


async def dsi_simulator():
    await sio.connect(f'http://localhost:{PORT}', namespaces=['/', '/dsi'])
    await sio.start_background_task(_dsi_simulator, include_enter=True)
    await sio.wait()


if __name__ == '__main__':
    asyncio.run(dsi_simulator())
