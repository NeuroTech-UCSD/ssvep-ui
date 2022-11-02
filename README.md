# Triton Neurotech SSVEP Caretaker React App

This app allows the ALS patient to communicate with the caretaker via any laptop, ipad, or mobile devices, as long as
the patient and the caretaker are using the same network. For more information, refers
to https://github.com/NeuroTech-UCSD/Oz-Speller. It is also compatible with the chatbot feature, please refer
to https://github.com/NeuroTech-UCSD/Conversational-Agents-for-Hospitalized-Agents.
To see the full video explaination of the project, please go to [Oz-Speller, the SSVEP EEG Virtual Keyboard | Triton NeuroTech 2022](https://www.youtube.com/watch?v=lCYkRotGZEc)
<br>


## App Design
<img src="images/chatbot_final.gif" width="300" height="auto"> <br>
Caretakers and ALS patients are able to communicate in a text message format. There are a number of features that come with
this application: start/stop, clear, settings, and manual/auto. <br>


### Start/Stop
<img src="https://user-images.githubusercontent.com/42593027/199354553-d44fcf19-e477-4c1d-be1e-4ef02565e953.png" width="300" height="auto">

Since it can be physically and mentally taxing to be typing all of the time, we implemented the ability for the caretaker 
to start/stop the communication pipeline so that they can give the patients a break. Additionally, each stop (break) and
start (type) session has a timer to encourage the patient to rest their eyes while using the speller. When the timer on typing
runs out, the patient will be able to take a break before starting to type again. This is useful so that patients can have
consistent breaks without needing a caretaker's assistance.

### Clear
<img src="https://user-images.githubusercontent.com/42593027/199355091-edb94297-6c2c-4b28-956c-cd3be3f40c91.png" width="300" height="auto">

After awhile, the chat buffer can become very large due to the speller being projected as a primary form of communication. To
make chatting more manageable, the caretaker has the ability to clear chat history to clean their screen up and reduce possible
lag due to high volume.

### Settings
<img src="https://user-images.githubusercontent.com/42593027/199355276-c84eda4f-0353-42a3-a28d-82518d30f955.png" width="300" height="auto">

The caretake also has the ability to set the settings of the duration of each break/type session. This allows patients to cater
the duration of their communication sessions to their needs.

### Manual/Auto
![image](https://user-images.githubusercontent.com/42593027/199355877-a416b34d-bedb-49c5-bc9f-64f6a78c14f1.png)
![image](https://user-images.githubusercontent.com/42593027/199355824-574f92e4-273f-4fc8-aba0-3ed7f20f1023.png)

The caretaker also has the ability to set responses to patients as manual or auto. Manual mode means that the caretaker is
physically responding to the patient. Auto mode means that our AI chatbot is generating responses to the patient. The reason
for this feature is so that we can further give the patient autonomy by giving them fast, generated responses so that the
patient does not need to experience latency waiting for the caretaker to respond to them. Additionally, in the future, there are
directions to use the chatbot or another program to auto recognize a subset of commands so that the app can perform tasks
for the patient such as initiating calls with friends and family without caretaker assistance.

## Activate Caretaker with Docker

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




