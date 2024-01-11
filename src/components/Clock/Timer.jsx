import { useRef, useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { startWorkoutWatch, startRestWatch } from "../../redux/reducers/stopWatchReducer"

import { Typography } from "@mui/material"


export default function Timer({ isRestTimer, size/* timeFromStopwatch,  stopwatch */ }) {

    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    //const [time, setTime] = useState(0)
    const time = isRestTimer ?
        useSelector(state => state.stopWatch.restWatch.time) :
        useSelector(state => state.stopWatch.workoutWatch.time)

    const isTimerActive = isRestTimer ?
        useSelector(state => state.stopWatch.restWatch.time.isActive) :
        useSelector(state => state.stopWatch.workoutWatch.time.isActive)

    

   // const workerRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isWorkoutActive) {

            if (isRestTimer) {
                //workerRef.current = getRestWorker()
                if (!isTimerActive) {
                    dispatch(startRestWatch())   
                    //startRestWorker()
                    //postMessageToRestWorker('start')
        
                }
                /* workerRef.current = getRestWorker()
                workerRef.current.onmessage = (e) => {
                    //dispatch(updateRestWatch(e.data))
                    setTime(e.data)
                } */
            } else {
                //workerRef.current = getWorkoutWorker()
                if (!isTimerActive) {
                    console.log("EFFECT DISPATCH ");
                    dispatch(startWorkoutWatch())
                    //startWorkoutWorker()
                    //postMessageToWorkoutWorker('start')
                }
               /*  workerRef.current = getWorkoutWorker()
                workerRef.current.onmessage = (e) => {
                    //dispatch(updateWorkoutWatch(e.data))
                    setTime(e.data)
                } */
            }
        }

        /* return () => {
            console.log('Terminating...')
            isRestTimer ? dispatch(terminateRestWatch()) : dispatch(terminateWorkoutWatch())
        } */

    }, [isWorkoutActive])

    return (
        <Typography variant={size} textAlign={'center'} padding={0} margin={0}>
            <span className="digits">
                {("0" + Math.floor(((time) / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor(((time) / 1000) % 60)).slice(-2)}
            </span>
            {/*  <span className="digits mili-sec">
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </span> */}
        </Typography>
    )
}
