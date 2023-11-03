import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workoutStarted: false,
    workoutTitle: "",
}

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        startWorkout(state) {
            //console.log(JSON.parse(JSON.stringify(state)))
            state.workoutStarted = true
            //console.log(JSON.parse(JSON.stringify(state)))
        },
        clearWorkout(state) {
            return initialState;
        },
        updateWorkoutTitle(state, action) {
            const title = action.payload
            state.workoutTitle = title
        },
        copyWorkout(state, action) {
            state.workoutStarted = true
            state.workoutTitle = action.payload.title
        }
    }
})

export const {
    startWorkout,
    clearWorkout,
    updateWorkoutTitle,
    copyWorkout
} = workoutSlice.actions

export default workoutSlice.reducer