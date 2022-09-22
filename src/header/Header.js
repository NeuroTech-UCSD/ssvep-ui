import { Grid } from '@mui/material'
import Button from '../button/Button'
import './Header.css'

function Header(props) {
    return (
        <div>
            <Grid container spacing={2} style={{ padding: "10px"}}>
                <Grid item xs={8} style={{ display: "flex", alignItems: "center"}}>
                    <div style={{ fontSize: "30px", paddingLeft: "5px", letterSpacing: "1px"}}>
                        Break: 19:05
                    </div>
                </Grid>
                <Grid item xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                    bgColor={props.start ? "#95E8A7" : "#FFAFAF"}
                    text={props.start ? "Start" : "Stop"}
                    color={props.start ? "#146812" : "#FE1F1F" }
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
                    />
                </Grid>
                <Grid item xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                    bgColor="#E2E2E2"
                    text="Ask"
                    color="#676767"
                    />
                </Grid>
            </Grid>
            <hr />
        </div>
    )
}

export default Header