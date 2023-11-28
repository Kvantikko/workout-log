import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    searchString: '',
    showFullWidth: false,
    exercises: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchString = action.payload.searchString
            state.showFullWidth = action.payload.showFullWidth
            return state
        },
        resetSearch: (state, action) => {
            state = initialState
            return state
        },
        setSearchExercises: (state, action) => {
            state.exercises = action.payload
            return state
        },
        
    }
});

export const {
    resetSearch,
    setSearch,
    setSearchExercises
} = searchSlice.actions;

export default searchSlice.reducer