import React, { useEffect, useRef } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
//import { pauseWatch, setWorker, startWatch, stopWatch, updateTime } from '../../redux/reducers/stopWatchReducer';
import Timer from './Timer';
import ControlButtons from "../Buttons/ControlButton"
//import { startWorker, stopWorker, postMessageToWorker, getWorker } from '../../workers/restWatchWorkerManager';

function StopWatch({ showButtons, size, isRestTimer }) {

    const workerRef = useRef();

    const dispatch = useDispatch();

    /* useEffect(() => {
        console.log('STOP WATCH EFFECT');
        if (!isWorker) {
            console.log('Creating worker...');
            startWorker();
            handleStart();
        }

        workerRef.current = getWorker()

        workerRef.current.onmessage = (e) => {

            dispatch(updateTime(e.data));
        }


    }, [dispatch, isWorker]); */

    const handleStart = () => {
        //postMessageToWorker('start')
        //dispatch(startWatch());
    };

    /* const handlePauseResume = () => {
        postMessageToWorker(isPaused ? 'start' : 'pause');
        dispatch(pauseWatch());
    }; */

    const handleReset = () => {
        //postMessageToWorker('reset')
        /* dispatch(stopWatch());
        dispatch(setWorker(false));
        dispatch(updateTime(0)); */
    };

    return (
        <Stack direction={'row'}>

            <Box sx={{ margin: 'auto' }}>
                <Timer isRestTimer={isRestTimer} size={size} />
            </Box>

            {/* {showButtons &&
                <ControlButtons
                    sx={{ justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}
                    active={isActive}
                    isPaused={isPaused}
                    handleStart={handleStart}
                    //handlePauseResume={handlePauseResume}
                    handleReset={handleReset}
                />
            } */}

        </Stack>
    );
}

export default StopWatch;
