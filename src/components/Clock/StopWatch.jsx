import React, { useEffect, useRef } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
//import { pauseWatch, setWorker, startWatch, stopWatch, updateTime } from '../../redux/reducers/stopWatchReducer';
import Timer from './Timer';
import ClockControlButtons from '../Buttons/ClockControlButton';
import { pauseRestWatch, pauseWorkoutWatch, resetRestWatch, resetWorkoutWatch, startRestWatch, startWorkoutWatch } from '../../redux/reducers/stopWatchReducer';
//import { startWorker, stopWorker, postMessageToWorker, getWorker } from '../../workers/restWatchWorkerManager';

function StopWatch({ showButtons, size, isRestTimer }) {

    const isActive = isRestTimer ?
        useSelector(state => state.stopWatch.restWatch.isActive) :
        useSelector(state => state.stopWatch.workoutWatch.isActive)

    console.log("Rendering StopWath", isRestTimer, " on act ", isActive);

    const dispatch = useDispatch();

    const handleStart = () => {
        isRestTimer ? dispatch(startRestWatch()) : dispatch(startWorkoutWatch())
    }

    const handlePause = () => {
        isRestTimer ? dispatch(pauseRestWatch()) : dispatch(pauseWorkoutWatch())
    }

    const handleReset = () => {
        isRestTimer ? dispatch(resetRestWatch()) : dispatch(resetWorkoutWatch())
    }

    return (
        <Stack direction={'row'}>
            <Box sx={{ margin: 'auto' }}>
                <Timer isRestTimer={isRestTimer} size={size} />
            </Box>
            {showButtons &&
                <ClockControlButtons
                    sx={{ justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}
                    isActive={isActive}
                    //isPaused={isPaused}
                    handleStart={handleStart}
                    handlePause={handlePause}
                    handleReset={handleReset}
                />
            }
        </Stack>
    )
}

export default StopWatch;
