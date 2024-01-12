import { createSlice } from '@reduxjs/toolkit'
import { logout } from "./userReducer"

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
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
          return false
        })
      },
});

export const { expand, unExpand } = drawerSlice.actions;

export default drawerSlice.reducer