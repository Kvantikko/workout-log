import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        setWorkouts(state, action ) {
            return action.payload
        },
        addToHistory(state, action) {
            console.log("payload: ", action.payload);
            state.push(action.payload)
        }
    }
})

export const {
    setWorkouts,
    addToHistory
} = historySlice.actions

export default historySlice.reducer