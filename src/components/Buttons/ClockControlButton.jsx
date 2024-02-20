import { Stack, IconButton } from "@mui/material"
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from "@mui/icons-material/RestartAlt"

const ClockControlButtons = ({ isActive, handleStart, handlePause, handleReset }) => {

    return (
        <Stack direction={'row'} paddingX={1} >
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
                <RestartAltIcon/>
            </IconButton>
        </Stack>
    )
}

export default ClockControlButtons
