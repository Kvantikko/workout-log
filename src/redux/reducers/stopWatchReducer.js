import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    time: 0,
    isActive: false,
    isPaused: true,
    worker: null
}

const stopWatchSlice = createSlice({
    name: 'stopWatch',
    initialState,
    reducers: {
        startWatch: (state, action) => {
            state.isActive = true
            state.isPaused = false
        },
        stopWatch: (state, action) => {
            return initialState
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

    }
});

export const { startWatch, stopWatch, pauseWatch, updateTime, setWorker } = stopWatchSlice.actions;

export default stopWatchSlice.reducer