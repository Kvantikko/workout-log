import { createSlice } from '@reduxjs/toolkit'

/* const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_EXERCISE':
            state.push(action.payload) // muuta statea
            return state // palauta uusi state
        case 'EDIT_EXRCISE':
        
            return state // palauta uusi state
        case 'DELETE_EXRCISE':
           
            return state // palauta uusi state
        default:
            return state
    }
}


export const createExercise = (name, muscle) => {
    return {
        type: 'NEW_EXERCISE',
        payload: {
            id: generateId(),
            name,
            muscle
        }
    }
} */

const exerciseLibrarySlice = createSlice({
    name: 'exercises',
    initialState: [],
    reducers: {
        createExercise(state, action) {
            console.log("action.payload ", action.payload);
            const exercise = {
                name: action.payload.name,
                muscle: action.payload.muscle,
                id: action.payload.id
            }
            state.push(exercise)
        },
        updateExercise(state, action) {
            const id = action.payload.id
            const exerciseToChange = state.find(e => e.id === id)
            const changedExercise = {
                ...exerciseToChange,
                name: action.payload.name,
                muscle: action.payload.muscle
            }
            return state.map(exercise =>
                exercise.id !== id ? exercise : changedExercise
            )
        },
        setExercises(state, action ) {
            return action.payload
        },
        addExercise(state, action) {
            const exercise = action.payload
            console.log('slice: ', exercise);
            state.push(exercise)
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
    createExercise,
    updateExercise,
    setExercises,
    addExercise,
    removeExercise 
} = exerciseLibrarySlice.actions
export default exerciseLibrarySlice.reducer