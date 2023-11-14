import { createSlice } from '@reduxjs/toolkit'

const exerciseHistorySlice = createSlice({
    name: 'exerciseHistory',
    initialState: [],
    reducers: {
        addExerciseHistory(state, action) {
            console.log("action.payload ", action.payload);
            const workoutExercise = action.payload
            state.push(workoutExercise)
        },
       
        findExerciseHistory(state, action) {
            const exerciseId = action.payload
            const found = state.filter(wE => {
                wE.exercise.id === exerciseId
            })
            console.log("FOUND ", found);
            return found
        }
    },
})

export const {
    addExerciseHistory,
    findExerciseHistory
} = exerciseHistorySlice.actions
export default exerciseHistorySlice.reducer