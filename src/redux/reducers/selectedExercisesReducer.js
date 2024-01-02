import { createSlice } from "@reduxjs/toolkit"
import generateId from "../../utils/generateId"
import templateService from "../../services/templates"
import workoutService from "../../services/workouts"
import { addTemplate, updateTemplate } from "./templateLibraryReducer"
import { updateWorkout } from "./historyReducer"
import { toast } from "react-toastify"

const initialState = {
    byId: {},
    allIds: []
}

const templateSlice = createSlice({
    name: 'selectedExercises',
    initialState,
    reducers: {
        addSelectedExercise(state, action) {
            const exercise = action.payload
            state.byId[exercise.id] = exercise
            state.allIds.push(exercise.id)
            return state

        },
        removeSelectedExercise(state, action) {
            const exerciseId = action.payload
            delete state.byId[exerciseId]
            state.allIds.splice(state.allIds.indexOf(exerciseId), 1)
            return state
        },
        clearSelectedExercises(state, action) {
            return initialState
        }
    }
})

export const {
    addSelectedExercise,
    removeSelectedExercise,
    clearSelectedExercises
} = templateSlice.actions

export default templateSlice.reducer