import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //id: null,
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
        setTemplateName(state, action) {
            const title = action.payload
            state.templateName = title
            return state
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
        addSetsToTemplate(state, action) {
            const setsToAdd = action.payload
            setsToAdd.forEach(s => {
                state.sets.push(s)
            })
            console.log("STATE: ", JSON.parse(JSON.stringify(state)))
            return state
        },
        deleteSetFromTemplate(state, action) {
            console.log("DELETE REDUCER ");
            console.log(action.payload);

            const id = action.payload
      
            console.log("BEFORE ", JSON.parse(JSON.stringify(state)))
            state.sets = state.sets.filter(s => {
                console.log("FILTER ", JSON.parse(JSON.stringify(s)))
                console.log("BOOLEAN ", s.id, " ", id, " ", s.id !== id);
                return s.id !== id
            })
            console.log("AFTER ", JSON.parse(JSON.stringify(state)))
            return state
        },
        editSetFromTemplate(state, action) {
            const setId = action.payload.setId
            state.sets[state.sets.findIndex(set => set.id === setId)] = action.payload.changedSet
            //console.log("editSet end, state:", JSON.parse(JSON.stringify(state.exercises)))
            return state
        },
        copyToState() {

        }
    }
})

export const {
    clearTemplate,
    setTemplateName,
    addExercisesToTemplate,
    deleteExerciseFromTemplate,
    addSetToTemplate,
    deleteSetFromTemplate,
    addSetsToTemplate,
    editSetFromTemplate,
    copyToState
} = templateSlice.actions

export default templateSlice.reducer