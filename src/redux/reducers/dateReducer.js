import { createSlice } from '@reduxjs/toolkit'

const initialState = new Date()

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(action, payload) {
            state = payload
        },

        
    }
});

export const {

} = navSlice.actions;

export default dateSlice.reducer