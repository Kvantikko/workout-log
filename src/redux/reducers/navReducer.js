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
        setWorkoutPath: (state, action) => {
            console.log("PATH REDUCER ");
            state[0] = action.payload
            return state
        },
        resetWorkoutPath: (state, action) => {
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
        setExercisesPath: (state, action) => {
            state[2] = action.payload
            return state
        },
        resetExercisePath: (state, action) => {
            state[2] = 'exercises'
            return state
        },
        
    }
});

export const {
    setWorkoutPath,
    resetWorkoutPath,
    pushHistory,
    resetHistory,
    setExercisesPath,
    resetExercisePath,
} = navSlice.actions;

export default navSlice.reducer