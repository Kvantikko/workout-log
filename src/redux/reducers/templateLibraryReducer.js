import { createSlice } from '@reduxjs/toolkit'

// this will sort the exercises in alphabetical order after a new template is added or edited
const sortAlphabetically = (array) => {
    array.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
    });
}

const exerciseLibrarySlice = createSlice({
    name: 'templates',
    initialState: [],
    reducers: {
        createTemplate(state, action) {
            state.push(action.payload) // action.payload is exercise object
            sortAlphabetically(state)
            return state
        },
        updateTemplate(state, action) {
            const id = action.payload.id
            const exerciseToChange = state.find(e => e.id === id)
            const changedExercise = {
                ...exerciseToChange,
                name: action.payload.name,
                muscle: action.payload.muscle
            }
            state = state.map(exercise => exercise.id !== id ? exercise : changedExercise)
            sortAlphabetically(state)
            return state
        },
        setTemplates(state, action ) {
            return action.payload
        },
        removeTemplate(state, action) {
            const id = action.payload
            const exerciseToDelete = state.find(e => e.id === id)
            // exercise.id is not equal no id? -> true -> put it in array | is equal? dont put it in array
            state = state.filter(exercise => exercise.id !== id)
            return state
        }
    },
})

export const {
    createTemplate,
    updateTemplate,
    setTemplates,
    removeTemplate
} = templateLibrarySlice.actions
export default templateLibrarySlice.reducer