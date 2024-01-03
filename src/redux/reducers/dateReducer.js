import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const date = dayjs().toString()  //new Date() //dayjs()

const initialState = date //{ month: date.$M, year: year.$y }

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(state, action) {
            state = action.payload
            return state
        },
    }
});

export const {
    setDate
} = dateSlice.actions;

export default dateSlice.reducer