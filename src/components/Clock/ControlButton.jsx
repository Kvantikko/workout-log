
import React from "react";
import { Button, Stack, Box } from "@mui/material";
//import "./ControlButtons.css";

import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function ControlButtons(props) {
    const StartButton = (
        <div className="btn btn-one btn-start"
            onClick={props.handleStart}>
            Start stopwatch
        </div>
    );
    const ActiveButtons = (
        <Box
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
            //display={'flex'}
            //flexDirection={'row'}
            gap={2}
        /* sx={{
            alignItems: 'center',
            margin: 'auto'
        }} */
        >
            <Button variant="contained" sx={{ marginY: 2, marginLeft: 1.5 }} onClick={props.handlePauseResume}>
                {props.isPaused ? <PlayArrowIcon /> : <PauseIcon />}
            </Button>
            <Button variant="secondary" sx={{ margin: 0 }} onClick={props.handleReset}>
                <CloseIcon></CloseIcon>
            </Button>

        </Box>
    );

    return (
        <div className="Control-Buttons">
            <div>{props.active ? ActiveButtons : StartButton}</div>
        </div>
    );
}
