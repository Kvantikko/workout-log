import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import exerciseService from "../../services/exercises"
import { sortAlphabetically } from '../../utils/SortAlphabetically'

const initialState = {
    exercises: [],
    selected: {
        byId: {},
        all: []
    },
    search: {
        searchString: '',
        showFullWidth: false,
        filteredExercises: []
    }
}


const exerciseLibrarySlice = createSlice({
    name: 'exercises',
    initialState: initialState,
    reducers: {
        addExercise(state, action) {
            state.exercises.push(action.payload) // action.payload is exercise object
            sortAlphabetically(state.exercises)

            state.search.filteredExercises.push(action.payload)
            return state
        },
        updateExercise(state, action) {
            console.log("UPDTING");
            const id = action.payload.id
            const exerciseToChange = state.exercises.find(e => e.id === id)
            const changedExercise = {
                ...exerciseToChange,
                name: action.payload.name,
                muscle: action.payload.muscle
            }
            state = state.exercises.map(exercise => exercise.id !== id ? exercise : changedExercise)
            sortAlphabetically(state.exercises)
            return state
        },
        setExercises(state, action) {
            state.exercises = action.payload
            state.search.exercises = action.payload
            return state
        },
        removeExercise(state, action) {
            const id = action.payload
            const exerciseToDelete = state.exercises.find(e => e.id === id)
            // exercise.id is not equal no id? -> true -> put it in array | is equal? dont put it in array
            state = state.exercises.filter(exercise => exercise.id !== id)
            return state
        },



        addSelectedExercise(state, action) {
            const exercise = action.payload
            state.selected.byId[exercise.id] = exercise
            state.selected.all.push(exercise)
            return state

        },
        removeSelectedExercise(state, action) {
            const exerciseId = action.payload
            delete state.selected.byId[exerciseId]
            state.selected.all.splice(state.selected.all.indexOf(exerciseId), 1)
            return state
        },
        clearSelectedExercises(state, action) {
            state.selected = { byId: {}, all: [] }
            return state
        },




        setSearch: (state, action) => {
            state.search.searchString = action.payload.searchString
            state.search.showFullWidth = action.payload.showFullWidth
            state.search.filteredExercises = state.exercises.filter(
                e => e.name.toLowerCase().includes(action.payload.searchString.toLowerCase())
            )
            return state
        },
        resetSearch: (state, action) => {
            state.search = {
                searchString: '',
                showFullWidth: false,
                filteredExercises: []
            }
            return state
        },
        setSearchExercises: (state, action) => {
            state.search.filteredExercises = action.payload
            return state
        },
    },
})

export const {
    addExercise,
    updateExercise,
    setExercises,
    removeExercise,

    addSelectedExercise,
    removeSelectedExercise,
    clearSelectedExercises,

    resetSearch,
    setSearch,
    setSearchExercises
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

