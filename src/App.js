import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import './App.css';
import Header from './header/Header';
import socketIOClient from "socket.io-client";

let port = 4002;
const socket = socketIOClient("http://localhost:" + port + '/caretaker');

function App() {

  const [text, setText] = useState("")
  const time = 19*60
  const [start, setStart] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  useEffect(() => {
    if (start) {
      socket.on('get prediction', (prediction) => {
        let incomingText = prediction
        if (prediction === '\n') {
          const timestamp = '\n' + getTimeStamp()
          incomingText = timestamp + prediction
        }
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

  return (
    <div className="app-container">
      <Header 
      start = {start}
      startStopClick = {startStopClick}
      settingsClick = {setSettingsClick}
      clearClick = {clearClick}
      timer = {time} />
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
                Speak Duration
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" defaultValue={19} label="min"></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" defaultValue={0} label="sec"></TextField>
              </Grid>
              <Grid item xs={4}>
                Break Duration
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" defaultValue={19} label="min"></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField type="number" defaultValue={0} label="sec"></TextField>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained">Apply</Button>
              </Grid>
            </Grid>
          </Box>
      </Modal>
    </div>
  );
}

export default App;
