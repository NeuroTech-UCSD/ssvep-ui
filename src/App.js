import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import './App.css';
import Header from './header/Header';
import socketIOClient from "socket.io-client";

function App() {

  const [sampleText, setSampleText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio arcu, porttitor et sodales at, porttitor et lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse nec ex rutrum, euismod elit in, iaculis augue. Pellentesque condimentum tellus tellus, id luctus elit faucibus vitae. Cras eros dolor, commodo eget mollis eu, accumsan nec urna. Aliquam erat volutpat. Aliquam in nunc quis velit aliquam sagittis. Maecenas vehicula bibendum consequat. Aliquam ut pellentesque tellus, non iaculis diam. Praesent tincidunt elementum orci quis aliquet. Nam at risus quis orci mattis eleifend. Etiam aliquet risus eu libero luctus, eget accumsan quam interdum. Sed lobortis lorem quis erat scelerisque tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio arcu, porttitor et sodales at, porttitor et lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse nec ex rutrum, euismod elit in, iaculis augue. Pellentesque condimentum tellus tellus, id luctus elit faucibus vitae. Cras eros dolor, commodo eget mollis eu, accumsan nec urna. Aliquam erat volutpat. Aliquam in nunc quis velit aliquam sagittis. Maecenas vehicula bibendum consequat. Aliquam ut pellentesque tellus, non iaculis diam. Praesent tincidunt elementum orci quis aliquet. Nam at risus quis orci mattis eleifend. Etiam aliquet risus eu libero luctus, eget accumsan quam interdum. Sed lobortis lorem quis erat scelerisque tempus.")
  const time = 19*60
  const [start, setStart] = useState(true)
  const [counter, setCounter] = useState(1)
  const [openSettings, setOpenSettings] = useState(false)

    let socket = null;
    let port = 4002;
    useEffect(() => {
        socket = socketIOClient("http://localhost:" + port + '/caretaker');
         // TODO: Remove this later
        socket.on('get prediction', (prediction) => {
            console.log(prediction + ', counter: ' + counter)});
            setCounter(counter + 1);
    }, []);

  const clearClick = () => {
    setSampleText("")
  }

  const startStopClick = () => {
    setStart(!start)
  }

  const setSettingsClick = () => {
    setOpenSettings(!openSettings)
  }

  const processText = (text) => {
    const words = text.split(' ')

    var splitText = []

    var prev = 0
    for (var i = 11; i < words.length; i += 10) {
      var slice = words.slice(prev, i)
      splitText.push(slice.join(" "))
      prev = i
    }

    var lastSlice = words.slice(prev)
    splitText.push(lastSlice.join(" "))

    return splitText
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
          processText(sampleText).map((text, index) => {
            return <div>
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
