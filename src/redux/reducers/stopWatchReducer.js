import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActive: false,
    isPaused: true,
    timerSize: ""
}

const stopWatchSlice = createSlice({
    name: 'stopWatch',
    initialState,
    reducers: {
        startWatch: (state, action) => {
            state.isActive = true
            state.isPaused = false
            state.timerSize = "h1"
        },
        stopWatch: (state, action) => {
            state.isActive = false
            state.isPaused = true
            state.timerSize = ""
        },
        pauseWatch: (state, action) => {
            state.isPaused = !state.isPaused
        }
    }
});

export const { startWatch, stopWatch, pauseWatch } = stopWatchSlice.actions;

export default stopWatchSlice.reducer