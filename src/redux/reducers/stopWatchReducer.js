import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActive: false,
    isPaused: true,
    time: 0,
    timerSize: "",
    worker: null
}

const stopWatchSlice = createSlice({
    name: 'stopWatch',
    initialState,
    reducers: {
        startWatch: (state, action) => {
            state.isActive = true
            state.isPaused = false
            state.timerSize = "h2"
        },
        stopWatch: (state, action) => {
            state.isActive = false
            state.isPaused = true
            state.time = 0;
            state.timerSize = ""
        },
        pauseWatch: (state, action) => {
            state.isPaused = !state.isPaused
        },
        updateTime: (state, action) => {
            state.time = action.payload;
        },
        setWorker: (state, action) => {
            //console.log(action.payload);
            state.worker = action.payload
        }

        
        /* start: (state) => {
            state.isActive = true;
            state.isPaused = false;
        },
        pause: (state) => {
            state.isPaused = true;
        },
        reset: (state) => {
            state.isActive = false;
            state.isPaused = false;
            state.time = 0;
        },
        updateTime: (state, action) => {
            state.time = action.payload;
        }, */
    }
});

export const { startWatch, stopWatch, pauseWatch, updateTime, setWorker } = stopWatchSlice.actions;

export default stopWatchSlice.reducer