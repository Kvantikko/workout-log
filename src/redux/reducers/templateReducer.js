import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    templateName: "New workout template",
    exercises: [],
    sets: [],
}

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        clearTemplate(state, action) {
            return initialState;
        },
        updateTemplateName(state, action) {
            const title = action.payload
            state.workoutTitle = title
        },
        addExercisesToTemplate(state, action) {
            const exercisesToAdd = action.payload
            exercisesToAdd.forEach(e => {
                state.exercises.push(e)
            })
           // console.log("STATE: ", JSON.parse(JSON.stringify(state)))
            return state
        },
        deleteExerciseFromTemplate(state, action) {
            const id = action.payload
            state.exercises = state.exercises.filter(e => e.id !== id)
            return state
        },
        addSetToTemplate(state, action) {
            state.sets.push(action.payload)
            return state
        },
        deleteSetFromTemplate(state, action) {
            const id = action.payload
            state.sets = state.sets.filter(e => e.id !== id)
            return state
        },
        editSetFromTemplate(state, action) {
            const setId = action.payload.setId
            state.sets[state.sets.findIndex(set => set.id === setId)] = action.payload.changedSet
            //console.log("editSet end, state:", JSON.parse(JSON.stringify(state.exercises)))
            return state
        },
    }
})

export const {
    clearTemplate,
    addExercisesToTemplate,
    deleteExerciseFromTemplate,
    addSetToTemplate,
    deleteSetFromTemplate,
    editSetFromTemplate
} = templateSlice.actions

export default templateSlice.reducer