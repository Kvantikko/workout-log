import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pauseWatch, startWatch, stopWatch } from "../../redux/reducers/stopWatchReducer";
import StopWatchWorker from 'worker-loader!./stopwatch-worker'; // Adjust the path

function StopWatch() {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.stopWatch.isActive);
  const isPaused = useSelector((state) => state.stopWatch.isPaused);
  const [time, setTime] = useState(0);
  const timerSize = useSelector((state) => state.stopWatch.timerSize);
  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new StopWatchWorker();

    workerRef.current.onmessage = (e) => {
      setTime(e.data);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleStart = () => {
    workerRef.current.postMessage('start');
    dispatch(startWatch());
  };

  const handlePauseResume = () => {
    workerRef.current.postMessage(isPaused ? 'start' : 'pause');
    dispatch(pauseWatch());
  };

  const handleReset = () => {
    workerRef.current.postMessage('reset');
    dispatch(stopWatch());
    setTime(0);
  };

  return (
    <>
      <Typography variant={timerSize} textAlign={"center"}>
        {time}
      </Typography>
      {/* Rest of your component */}
    </>
  );
}

export default StopWatch;
