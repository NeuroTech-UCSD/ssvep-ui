# Triton Neurotech SSVEP Caretaker React App

This app allows the ALS patient to communicate with the caretaker via any laptop, ipad, or mobile devices, as long as
the patient and the caretaker are using the same network. For more information, refers
to https://github.com/NeuroTech-UCSD/Oz-Speller. It is also compatible with the chatbot feature, please refer
to https://github.com/NeuroTech-UCSD/Conversational-Agents-for-Hospitalized-Agents.

## Activate caretaker with docker

* `docker pull ghcr.io/neurotech-ucsd/ssvep-ui:master`
* `docker run -p 3000:3000 -e REACT_APP_HOST="100.112.254.11" -e APP_PORT=4002 ghcr.io/neurotech-ucsd/ssvep-ui:master`
    * make sure you supply your network ip and app port and they're the same as `Oz-Speller`
      and `Conversational-Agents-for-Hospitalized-Agents`
* Then go on http://100.112.254.11:3000

## To Contribute Locally

* `pip install -r requirements.txt` to download all dependencies for python
* `pip install -e .` to trigger `setup.py`
* `npm install` to download all dependencies for React
* `npm start` starts the react app, runs the app in the development mode. For running everything without running other
  repos

### Microservices

To run the repo without other `Oz-Speller` scripts running:

#### Port number and host number

* To change port and host for server and dsi-simulator, go to `src/backend/settings.py`
* Also make sure the port and host in `App.js` are changed to the same port and host

#### DSI Simulator

* To run dsi simulator which will send a random text of 5 characters (configurable) every 3 seconds (configurable)
  `python src/backend/dsi_simulator.py`. This doesn't have to be run if `Oz-Speller` repo is running
  its `scripts/oz-speller_without-headset.py
  `
    * The `ISI` in the file is the simulated amount of time the speller would make a prediction in seconds. There is
      also option in the file to simulate the `ENTER` key every few characters, which simulates the patient sends
      the `ENTER`
      key. <br>
    * The dsi simulator sends its prediction to server, who then sends prediction to the frontend. Thus in `App.js`, we
      have to make sure that it's listening to the same port the server is on.

* To run dsi simulator with inputs from command line, do
  `python src/backend/dsi_manual_simulator.py`. This doesn't have to be run if `Oz-Speller` repo is running its `
  scripts/oz-speller_without-headset.py

#### Server

* To activate server, run `python src/backend/server.py`. This doesn't have to be run if `Oz-Speller` repo is running
  its `oz-speller_without-headset.py
  `




