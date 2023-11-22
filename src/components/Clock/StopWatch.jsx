import React, { useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { pauseWatch, setWorker, startWatch, stopWatch, updateTime } from '../../redux/reducers/stopWatchReducer';
import Timer from './Timer';
import ControlButtons from './ControlButton';
import { startWorker as startWorkerManager, stopWorker as stopWorkerManager, postMessageToWorker as postMessageToWorkerManager, getWorker } from './workerManager';

function StopWatch() {
    const dispatch = useDispatch();
    const { isActive, isPaused, time, isWorker } = useSelector((state) => state.stopWatch);
    const timerSize = useSelector((state) => state.stopWatch.timerSize);
    const workerRef = useRef();

    useEffect(() => {
        console.log('STOP WATCH EFFECT');
        if (!isWorker) {
            console.log('Creating worker...');
            startWorkerManager();
            dispatch(setWorker(true));
            handleStart();
        }

        workerRef.current = getWorker()

        workerRef.current.onmessage = (e) => {
            //console.log('Received message from worker:', e.data);
            dispatch(updateTime(e.data));
        }

       /*  return () => {
            console.log('Terminating worker...');
            stopWorkerManager();
            dispatch(setWorker(null));
        }; */
    }, [dispatch, isWorker]);

    const handleStart = () => {
        postMessageToWorkerManager('start');
        dispatch(startWatch());
    };

    const handlePauseResume = () => {
        postMessageToWorkerManager(isPaused ? 'start' : 'pause');
        dispatch(pauseWatch());
    };

    const handleReset = () => {
        postMessageToWorkerManager('reset');
        dispatch(stopWatch());
        dispatch(setWorker(false));
        dispatch(updateTime(0));
    };

    return (
        <>
            <Typography variant={timerSize} textAlign={'center'}>
                <Timer time={time} />
            </Typography>
            <ControlButtons
                sx={{ justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}
                active={isActive}
                isPaused={isPaused}
                handleStart={handleStart}
                handlePauseResume={handlePauseResume}
                handleReset={handleReset}
            />
        </>
    );
}

export default StopWatch;
