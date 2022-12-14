import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Button from '../button/Button'
import './Header.css'

function Header(props) {

    const [timer, setTimer] = props.timer

    useEffect(() => {
        if (timer > 0) {
            const t = setTimeout(() => {
                setTimer(timer-1)
            }, 1000)
    
            return () => { clearTimeout(t) }
        } else {
            // set start/stop
            props.startStopClick()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer])

    function formatTime(time) {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60

        let formattedSeconds = seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })

        return minutes + ":" + formattedSeconds
    }

    return (
        <div>
            <Grid container spacing={2} style={{ padding: "10px"}}>
                <Grid item xs={8} style={{ display: "flex", alignItems: "center"}}>
                    <div style={{ fontSize: "30px", paddingLeft: "5px", letterSpacing: "1px"}}>
                        {!props.start ? "Type in" : "Break in"}: {formatTime(timer)}
                    </div>
                </Grid>
                <Grid item xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                    bgColor={!props.start ? "#95E8A7" : "#FFAFAF"}
                    text={!props.start ? "Start" : "Stop"}
                    color={!props.start ? "#146812" : "#FE1F1F" }
                    onClick = {props.startStopClick}
                    />
                </Grid>
                <Grid item xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                    bgColor="#E2E2E2"
                    text="Clear"
                    color="#676767"
                    onClick={props.clearClick}
                    />
                </Grid>
                <Grid item xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                    bgColor="#E2E2E2"
                    text="Settings"
                    color="#676767"
                    onClick={props.settingsClick}
                    />
                </Grid>
                <Grid item xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                    bgColor="#E2E2E2"
                    text={props.manual ? "Manual" : "Auto"}
                    color="#676767"
                    onClick={() => props.setManual(!props.manual)}
                    />
                </Grid>
            </Grid>
            <hr />
        </div>
    )
}

export default Header