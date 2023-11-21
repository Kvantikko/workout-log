import { createSlice } from '@reduxjs/toolkit'

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: false,
    reducers: {
        darkModeOn: (state, action) => {
            state = true
            return state
        },
        darkModeOff: (state, action) => {
            state = false
            return state
        }
    }
});

export const { darkModeOff, darkModeOn } = darkModeSlice.actions;

export default darkModeSlice.reducer