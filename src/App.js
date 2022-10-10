import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import './App.css';
import Header from './header/Header';
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";

let port = 4002;
// const socket = socketIOClient("http://localhost:" + port + '/caretaker')
let host = 'localhost'
const socket = io("http://" + host + ":" + port + '/caretaker')
let breakTime = 10*60
let typeTime = 10*60

function App() {

  const [text, setText] = useState("")
  const [timer, setTimer] = useState(breakTime)
  const [start, setStart] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [breakMin, setBreakMin] = useState(Math.floor(breakTime / 60))
  const [breakSec, setBreakSec] = useState(breakTime % 60)
  const [typeMin, setTypeMin] = useState(Math.floor(typeTime / 60))
  const [typeSec, setTypeSec] = useState(typeTime % 60)
  useEffect(() => {
    if (start) {
      socket.on('get_message', (prediction) => {
        let incomingText = prediction
        const timestamp = '\n' + getTimeStamp()
        incomingText = timestamp + '\n' + prediction
        setText(text + incomingText)
      })
    }

    return () => {
      socket.off();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, start]);

  function getTimeStamp() {
    const date = new Date();
    return date.toLocaleString();
  }

  const clearClick = () => {
    setText("")
  }

  const startStopClick = () => {
    setStart(!start)
  }

  const setSettingsClick = () => {
    setOpenSettings(!openSettings)
  }

  const processText = (text) => {
    return text.split('\n')
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '1px solid #939393',
    color: '#939393',
    borderRadius: '5px',
    p: 4,
  };

  const applySettings = () => {
    let t = typeMin * 60 + typeSec
    let b = breakMin * 60 + breakSec
    if (start) {
      setTimer(t)
    } else {
      setTimer(b)
    }
    setOpenSettings(false)
    socket.emit("forward_message", {
      'typeDuration' : t,
      'breakDuraction' : b
    }, (response) => {
      console.log(response)
    })
  }

  return (
    <div className="app-container">
      <Header 
      start = {start}
      startStopClick = {startStopClick}
      settingsClick = {setSettingsClick}
      clearClick = {clearClick}
      timer = {[timer, setTimer]} />
      <div className="text-stream-box">
        {
          processText(text).map((text, index) => {
            return <div key={index}>
              <Typography>
                { text }
              </Typography>
              <br></br>
              </div>
          })
        }
      </div>

      <Modal
        open={openSettings}
        onClose={setSettingsClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Settings
            </Typography>
            <hr></hr>
            <Grid container spacing={2} style={{padding: '10px'}}>
              <Grid item xs={4}>
                Type Duration
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" value={typeMin} onChange={(event) => {setTypeMin(event.target.value)}} label="min"></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" value={typeSec} onChange={(event) => {setTypeSec(event.target.value)}} label="sec"></TextField>
              </Grid>
              <Grid item xs={4}>
                Break Duration
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" value={breakMin} onChange={(event) => {setBreakMin(event.target.value)}} label="min"></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" value={breakSec} onChange={(event) => {setBreakSec(event.target.value)}} label="sec"></TextField>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={applySettings} >Apply</Button>
              </Grid>
            </Grid>
          </Box>
      </Modal>
    </div>
  );
}

export default App;
