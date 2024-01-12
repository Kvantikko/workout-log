import { createSlice } from '@reduxjs/toolkit'
import { logout } from "./userReducer"

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
            state[0] = action.payload
            return state
        },
        resetWorkoutPath: (state, action) => {
            state[0] = ''
            return state
        },
        setHistoryPath: (state, action) => {
            state[1] = action.payload
            return state
        },
        resetHistoryPath: (state, action) => {
            state[1] = 'history'
            return state
        },
        setExercisesPath: (state, action) => {
            // console.log(action.payload);
            state[2] = action.payload
            return state
        },
        resetExercisePath: (state, action) => {
            state[2] = 'exercises'
            return state
        },
        setMeasurementsPath: (state, action) => {
            // console.log(action.payload);
            state[3] = action.payload
            return state
        },
        resetMeasurementsPath: (state, action) => {
            state[3] = 'measure'
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    },
});

export const {
    setWorkoutPath,
    resetWorkoutPath,
    setHistoryPath,
    resetHistoryPath,
    setExercisesPath,
    resetExercisePath,
    setMeasurementsPath,
    resetMeasurementsPath
} = navSlice.actions;

export default navSlice.reducer