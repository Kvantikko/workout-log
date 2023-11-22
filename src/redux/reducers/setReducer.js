import { createSlice } from "@reduxjs/toolkit";

const setSlice = createSlice({
    name: 'sets',
    initialState: [],
    reducers: {
        clearSets(state) {
            state = []
            return state
        },
        addSet: (state, action) => {
            const setToAdd = action.payload
            //console.log("STATE ", JSON.parse(JSON.stringify(state)));
            const setWithDoneField = {
                ...setToAdd,
                done: false
            }
            state.push(setWithDoneField);
            return state
        },
        deleteSet: (state, action) => {
            const id = action.payload
            console.log("REDUCER ", id);
            //console.log(JSON.parse(JSON.stringify(state.filter(set => set.id !== id))));
            state = state.filter(set => set.id !== id); // immutable, mutta ei tarvis täs
            console.log("STATE AFTER DELETE", JSON.parse(JSON.stringify(state)));
            return state
        },
        editSet(state, action) {
            const setId = action.payload.setId
            console.log("here we are in edit set reducer ", setId);
            console.log("coonery ", JSON.parse(JSON.stringify(state[state.findIndex(set => set.id === setId)])));
            console.log(action.payload.changedSet);
    
            state[state.findIndex(set => set.id === setId)] = action.payload.changedSet

            //console.log("editSet end, state:", JSON.parse(JSON.stringify(state.exercises)))

            return state
        },
        copySets(state, action) {
            console.log("COPY SETS REDUCER ", action.payload);
            state = action.payload
            return state
        }
    }
})

export const {
    clearSets,
    addSet,
    deleteSet,
    editSet,
    copySets
} = setSlice.actions

export default setSlice.reducer