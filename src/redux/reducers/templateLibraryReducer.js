import { createSlice } from '@reduxjs/toolkit'
import templateService from "../../services/templates"

// this will sort the exercises in alphabetical order after a new template is added or edited
const sortAlphabetically = (array) => {
    array.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
    });
}

const templateLibrarySlice = createSlice({
    name: 'templates',
    initialState: [],
    reducers: {
        addTemplate(state, action) {
            console.log("REDUCER ", action.payload);
            state.push(action.payload) // action.payload is exercise object
            console.log("PUSHED");
            sortAlphabetically(state)
            console.log("SORTED");
            return state
        },
       updateTemplate(state, action) {
            console.log("REDUCER ", action.payload);

            const id = action.payload.id
            
            const index = state.findIndex(t => t.id === id)

            state[index] = action.payload

            //state = state.map(exercise => exercise.id !== id ? exercise : changedExercise)
            //sortAlphabetically(state)
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
    addTemplate,
    updateTemplate,
    setTemplates,
    removeTemplate
} = templateLibrarySlice.actions



export default templateLibrarySlice.reducer