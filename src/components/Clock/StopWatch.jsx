
import React, { useState } from "react";
//import "./StopWatch.css";
import Timer from "./Timer";
import ControlButtons from "./ControlButton";
import { Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pauseWatch, startWatch, stopWatch } from "../../redux/reducers/stopWatchReducer";



function StopWatch() {
    const dispatch = useDispatch()
    const isActive = useSelector(state => state.stopWatch.isActive)
    const isPaused = useSelector(state => state.stopWatch.isPaused)
    //const [isActive, setIsActive] = useState(false);
    //const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    //const [timerSize, setTimerSize] = useState("")
    const timerSize = useSelector(state => state.stopWatch.timerSize)

    React.useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        //setIsActive(true);
        //setIsPaused(false);
        dispatch(startWatch())
        setTimerSize("h1")
    };

    const handlePauseResume = () => {
        //setIsPaused(!isPaused);
        dispatch(pauseWatch())
    };

    const handleReset = () => {
        //setIsActive(false);
        dispatch(stopWatch())
        setTime(0);
        //setTimerSize("")
    };

    return (
        <div className="stop-watch">
            <Stack direction={"row"} spacing={3}>
                <Typography variant={timerSize}>
                    <Timer time={time} />
                </Typography>
                <Container sx={{ justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}>
                    <ControlButtons
                        sx={{ justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}
                        active={isActive}
                        isPaused={isPaused}
                        handleStart={handleStart}
                        handlePauseResume={handlePauseResume}
                        handleReset={handleReset}
                    />
                </Container>

            </Stack>
        </div>
    );
}

export default StopWatch;
