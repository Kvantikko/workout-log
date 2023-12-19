import { createSlice } from '@reduxjs/toolkit'

import { postMessageToWorker, stopWorker } from '../../components/Clock/timerWorkerManager';

const initialState = {
    isActive: false,
    time: 0
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer: (state, action) => {
            state.isActive = true
        },
        resetTimer: (state, action) => {
            state.time = 0
            postMessageToWorker("reset")
            postMessageToWorker("start")
        },
        terminateTimer: (state, action) => {
            stopWorker()
            state.time = 0
            state.isActive = false
        },
        updateTimer: (state, action) => {
            state.time = action.payload;
        },
        
    }
});

export const { startTimer, terminateTimer, resetTimer, updateTimer } = timerSlice.actions;

export default timerSlice.reducer