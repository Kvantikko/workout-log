import { createSlice } from "@reduxjs/toolkit"

const historySlice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        setWorkouts(state, action) {
            state = action.payload
            return state
        },
        addWorkout(state, action) {
            state.unshift(action.payload)
            return state
        },
        removeWorkout(state, action) {
            state = state.filter(workout => workout.id !== action.payload)
            return state
        },
        updateWorkout(state, action) {
            const id = action.payload.id
            const index = state.findIndex(w => w.id === id)
            state[index] = action.payload
            //state = state.map(exercise => exercise.id !== id ? exercise : changedExercise)
            //sortAlphabetically(state)
            return state
        },
    }
})

export const {
    setWorkouts,
    addWorkout,
    removeWorkout,
    updateWorkout
} = historySlice.actions

export default historySlice.reducer