import time
import asyncio
import settings
import socketio
import random

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


async def _dsi_simulator():
    while True:
        await sio.sleep(ISI)
        prediction = rand_letter()
        print('Sending prediction:', prediction)
        await sio.emit('forward_prediction', prediction, namespace='/dsi_simulator')


async def dsi_simulator():
    await sio.connect(f'http://localhost:{PORT}', namespaces=['/', '/dsi_simulator'])
    await sio.start_background_task(_dsi_simulator)
    await sio.wait()


if __name__ == '__main__':
    asyncio.run(dsi_simulator())
