import { createSlice } from '@reduxjs/toolkit'

/* const initialState = {
    workout: 'workout',
    history: 'history',
    exercises: 'exercises',
    measurements: 'measurements',
    profile: 'profile'
} */

const initialState = [
    'workout',
    'history',
    'exercises',
    'measurements',
    'profile'
]

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        pushHistory: (state, action) => {
            state[1] = action.payload
            return state
        },
        resetHistory: (state, action) => {
            state[1] = 'history'
            return state
        }
    }
});

export const { pushHistory, resetHistory} = navSlice.actions;

export default navSlice.reducer