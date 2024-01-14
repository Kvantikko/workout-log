
import React from "react";
import { Button, Stack, Box } from "@mui/material";
//import "./ControlButtons.css";

import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TimerOffIcon from "@mui/icons-material/TimerOff";
import { IconButton } from "@mui/material";
import { RestartAlt, Restore } from "@mui/icons-material";

const ClockControlButtons = ({ isActive, handleStart, handlePause, handleReset }) => {

    return (
        <Stack className="Control-Buttons"  direction={'row'} paddingX={1}>
            <IconButton
                aria-label="stopwatch"
                sx={{ color: '#90CAF9' }}
                onClick={isActive ? handlePause : handleStart}
            >
                {isActive ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton
                aria-label="stopwatch"
                sx={{ color: '#90CAF9' }}
                onClick={handleReset}
            >
                <RestartAlt></RestartAlt>
            </IconButton>
        </Stack>
    )
}

export default ClockControlButtons
