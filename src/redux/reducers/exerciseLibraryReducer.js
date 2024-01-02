import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import exerciseService from "../../services/exercises"
import { sortAlphabetically } from '../../utils/SortAlphabetically'

const initialState = {
   exercises: { byId: {}, allIds: [] },
   selected: { byId: {}, allIds: [] }
}

const exerciseLibrarySlice = createSlice({
    name: 'exercises',
    initialState: [],
    reducers: {
        addExercise(state, action) {
            state.push(action.payload) // action.payload is exercise object
            sortAlphabetically(state)
            return state
        },
        updateExercise(state, action) {
            console.log("UPDTING");
            const id = action.payload.id
            const exerciseToChange = state.find(e => e.id === id)
            const changedExercise = {
                ...exerciseToChange,
                name: action.payload.name,
                muscle: action.payload.muscle
            }
            state = state.map(exercise => exercise.id !== id ? exercise : changedExercise)
            console.log("next sort");
            sortAlphabetically(state)
            console.log("RETURNIT");
            return state
        },
        setExercises(state, action) {
            return action.payload
        },
        removeExercise(state, action) {
            const id = action.payload
            const exerciseToDelete = state.find(e => e.id === id)
            // exercise.id is not equal no id? -> true -> put it in array | is equal? dont put it in array
            state = state.filter(exercise => exercise.id !== id)
            return state
        }
    },
})

export const {
    addExercise,
    updateExercise,
    setExercises,
    removeExercise
} = exerciseLibrarySlice.actions

export default exerciseLibrarySlice.reducer

export const saveExercise = (name, muscle) => {
    return async (dispatch, getState) => {

        let response
        try {
            const newExercise = await exerciseService.createNew(name, muscle)
            //console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
            dispatch(addExercise(newExercise))
            toast.success('New exercsise created!')
            //setOpenCreateModal(false)
        } catch (err) {
            toast.error(err.response)
        }
    }
}

export const editExercise = (exerciseId, exerciseName, targetMuscle) => {
    return async (dispatch, getState) => {
        try {
            const updatedExercise = await exerciseService.update(exerciseId, exerciseName, targetMuscle)
            console.log('servu palautti: ', updatedExercise, ' dispatchataan storeen')
            dispatch(updateExercise(updatedExercise))
            console.log("PERSE");
            toast.success('Exersice edited!')
            console.log("TOSTED");
        } catch (err) {
            toast.error(err.response)
        }
    }
}

export const deleteExercise = (id) => {
    return async (dispatch, getState) => {
        try {
            await exerciseService.remove(id)
            dispatch(removeExercise(id))
            toast.success("Exercise deleted succesfully!");
        } catch (err) {
            toast.error(err.response)
        }
    }
}

