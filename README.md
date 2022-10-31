# Triton Neurotech SSVEP Caretaker React App

## To Contribute Locally

#### `pip install -r requirements.txt`
#### `pip install -e .` to trigger `setup.py`
#### `npm install`
#### `npm start` starts the react app, runs the app in the development mode. For running everything without cloning other repos, refer to microservices


### Microservices

To run the repo without other repos running

#### DSI Simulator

* To run dsi simulator, run `cd src/backend` <br>
Then run `python dsi_simulator.py` <br>
* The `ISI` in the file is the simulated amount of time the speller would make a prediction in seconds. There is also
option in the file to simulate the `ENTER` key every few characters, which simulates the patient sends the `ENTER`
key. <br>
* The dsi simulator sends its prediction to server, who then sends prediction to the frontend. Thus in `App.js`, we have
to make sure that it's listening to the same port the server is on.

#### Server

To activate server, first from the root repository, do `cd src/backend`. <br>
Then run `python server.py` <br>

#### Port number

To change port for server and dsi-simulator, go to `src/backend/config.yaml`. Just note that the server port cannot be
the same port as the frontend port. 

## Docker
* `docker build . -t ssvep-ui`
* `docker run -p 3000:3000 -e REACT_APP_HOST="100.112.254.11" -e APP_PORT=4002 ssvep-ui`
* Then go on http://100.112.254.11:3000
