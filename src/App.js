import React, { useState } from 'react';
import { Typography } from '@mui/material';
import './App.css';
import Header from './header/Header';

function App() {

  const [sampleText, setSampleText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio arcu, porttitor et sodales at, porttitor et lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse nec ex rutrum, euismod elit in, iaculis augue. Pellentesque condimentum tellus tellus, id luctus elit faucibus vitae. Cras eros dolor, commodo eget mollis eu, accumsan nec urna. Aliquam erat volutpat. Aliquam in nunc quis velit aliquam sagittis. Maecenas vehicula bibendum consequat. Aliquam ut pellentesque tellus, non iaculis diam. Praesent tincidunt elementum orci quis aliquet. Nam at risus quis orci mattis eleifend. Etiam aliquet risus eu libero luctus, eget accumsan quam interdum. Sed lobortis lorem quis erat scelerisque tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio arcu, porttitor et sodales at, porttitor et lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse nec ex rutrum, euismod elit in, iaculis augue. Pellentesque condimentum tellus tellus, id luctus elit faucibus vitae. Cras eros dolor, commodo eget mollis eu, accumsan nec urna. Aliquam erat volutpat. Aliquam in nunc quis velit aliquam sagittis. Maecenas vehicula bibendum consequat. Aliquam ut pellentesque tellus, non iaculis diam. Praesent tincidunt elementum orci quis aliquet. Nam at risus quis orci mattis eleifend. Etiam aliquet risus eu libero luctus, eget accumsan quam interdum. Sed lobortis lorem quis erat scelerisque tempus.")
  const [start, setStart] = useState(true)

  const clearClick = () => {
    setSampleText("")
  }
  const startStopClick = () => {
    setStart(!start)
  }

  return (
    <div className="app-container">
      <Header 
      start = {start}
      startStopClick = {startStopClick}
      clearClick = {clearClick}/>
      <div className="text-stream-box">
        <Typography>
          { sampleText }
        </Typography>
      </div>
    </div>
  );
}

export default App;
