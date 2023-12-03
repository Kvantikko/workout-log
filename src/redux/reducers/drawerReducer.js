import { createSlice } from '@reduxjs/toolkit'

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: false,
    reducers: {
        expand: (state, action) => {
            state = true
            return state
        },
        unExpand: (state, action) => {
            state = false
            return state
        }
    }
});

export const { expand, unExpand } = drawerSlice.actions;

export default drawerSlice.reducer