import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { logout } from "./userReducer"

const initialState = dayjs().toString()

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(state, action) {
            state = action.payload
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    },
});

export const {
    setDate
} = dateSlice.actions;

export default dateSlice.reducer