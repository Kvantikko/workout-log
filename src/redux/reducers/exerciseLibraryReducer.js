import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import exerciseService from "../../services/exercises"
import { sortAlphabetically } from '../../utils/SortAlphabetically'
import { logout } from "./userReducer"

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
            sortAlphabetically(state.search.filteredExercises)
            
            return state
        },
        updateExercise(state, action) {
            const id = action.payload.id

            const index = state.exercises.findIndex(e => e.id === id)

            const exerciseToChange = state.exercises[index]//state.exercises.find(e => e.id === id)
            const changedExercise = {
                ...exerciseToChange,
                name: action.payload.name,
                muscle: action.payload.muscle
            }

            

            state.exercises[index] = changedExercise

            state.search.filteredExercises[index] = changedExercise

            sortAlphabetically(state.exercises)
            return state
        },
        setExercises(state, action) {
            state.exercises = action.payload
            state.search.filteredExercises = action.payload
            return state
        },
        removeExercise(state, action) {
            const id = action.payload
            const exerciseToDelete = state.exercises.find(e => e.id === id)
            // exercise.id is not equal no id? -> true -> put it in array | is equal? dont put it in array
            state.exercises = state.exercises.filter(exercise => exercise.id !== id)
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
            state.search.showFullWidth = action.payload.showFullWidth !== undefined ? action.payload.showFullWidth : state.search.showFullWidth
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
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
          return initialState
        })
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
            dispatch(updateExercise(updatedExercise))
            toast.success('Exersice edited!')
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

