
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
        <Box sx={{ alignItems: 'center', margin: 'auto' }}>
            <Stack spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}>
                <Button variant="secondary" onClick={props.handleReset}>
                    <CloseIcon></CloseIcon>
                </Button>
                <Button variant="contained" onClick={props.handlePauseResume}>
                    {props.isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                </Button>
            </Stack>
        </Box>
    );

    return (
        <div className="Control-Buttons">
            <div>{props.active ? ActiveButtons : StartButton}</div>
        </div>
    );
}
