import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        setWorkouts(state, action ) {
            return action.payload
        },
        addToHistory(state, action) {
            state.push(action.payload)
        },
        removeFromHistory(state, action) {
            console.log("STATE BEFORE: ", JSON.parse(JSON.stringify(state)))
            console.log(action.payload);
            //console.log(JSON.parse(JSON.stringify(   state.filter(workout => workout.id !== action.payload)  ))            );
            //console.log(JSON.parse(JSON.stringify(   state.filter(workout => workout.id === action.payload.id)  ))            );
           
            state = state.filter(workout => workout.id !== action.payload)
            console.log("STATE AFTER: ", JSON.parse(JSON.stringify(state)))
            return state
        }
    }
})

export const {
    setWorkouts,
    addToHistory,
    removeFromHistory
} = historySlice.actions

export default historySlice.reducer