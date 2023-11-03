import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
    name: 'exercises',
    initialState: [],
    reducers: {
        clearExercises(state) {
            state = []
            return state
        },
        addExercise: (state, action) => {
            const exerciseToAdd = action.payload
            state.push(exerciseToAdd)
            console.log("STATE: ", JSON.parse(JSON.stringify(state)))
            return state
        },
        deleteExercise: (state, action) => {
            const id = action.payload
            state = state.filter(e => e.id !== id); // immutable, mutta ei tarvis täs
            return state
        },
        copyExercises(state, action) {
            state = action.payload
            return state
        }
    }
})

export const {
    clearExercises,
    addExercise,
    deleteExercise,
    copyExercises
} = workoutSlice.actions

export default workoutSlice.reducer