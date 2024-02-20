import { createSlice } from "@reduxjs/toolkit"
import { logout } from "./userReducer"

const historySlice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        setWorkouts(state, action) {
            state = action.payload
            return state
        },
        addWorkout(state, action) {
            state.unshift(action.payload)
            return state
        },
        removeWorkout(state, action) {
            state = state.filter(workout => workout.id !== action.payload)
            return state
        },
        updateWorkout(state, action) {
            const index = state.findIndex(workout => workout.id === action.payload.id)
            state[index] = action.payload
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return []
        })
    },
})

export const {
    setWorkouts,
    addWorkout,
    removeWorkout,
    updateWorkout
} = historySlice.actions

export default historySlice.reducer