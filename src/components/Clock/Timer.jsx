
import React from "react";
import { useRef, useEffect } from "react";

import { startWorker, postMessageToWorker, stopWorker, getWorker } from './timerWorkerManager';

import { useSelector, useDispatch } from "react-redux";
import { startTimer, updateTimer } from "../../redux/reducers/timerReducer";
import { Typography } from "@mui/material";

export default function Timer({ timeFromStopwatch, size, stopwatch }) {

    const { isActive, time } = useSelector(state => state.timer);
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const workerRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {

        if (isWorkoutActive) {
            console.log('Creating timer worker...');
            startWorker()
            postMessageToWorker('start');
            dispatch(startTimer())

            console.log("EFEEEKTI")

            workerRef.current = getWorker()

            workerRef.current.onmessage = (e) => {
                dispatch(updateTimer(e.data));
            }
        }



        /*  return () => {
             console.log('Terminating worker...');
             stopWorker();
             dispatch(setWorker(null));
         }; */
    }, [isWorkoutActive])

    return (
        <Typography variant={size} textAlign={'center'}>
                <span className="digits">
                    {("0" + Math.floor(((stopwatch ? timeFromStopwatch : time) / 60000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                    {("0" + Math.floor(((stopwatch ? timeFromStopwatch : time) / 1000) % 60)).slice(-2)}
                </span>
            {/*  <span className="digits mili-sec">
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </span> */}
        </Typography>
    )
}
