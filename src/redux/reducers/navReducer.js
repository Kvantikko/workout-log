import { createSlice } from '@reduxjs/toolkit'

/* const initialState = {
    workout: 'workout',
    history: 'history',
    exercises: 'exercises',
    measurements: 'measurements',
    profile: 'profile'
} */

const initialState = [
    '',
    'history',
    'exercises',
    'measure',
    'profile'
]

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        pushWorkout: (state, action) => {
            state[0] = 'workout'
            return state
        },
        resetWorkout: (state, action) => {
            state[0] = ''
            return state
        },
        pushHistory: (state, action) => {
            state[1] = action.payload
            return state
        },
        resetHistory: (state, action) => {
            state[1] = 'history'
            return state
        },
        
    }
});

export const {
    pushWorkout,
    resetWorkout,
    pushHistory,
    resetHistory
} = navSlice.actions;

export default navSlice.reducer