import { createSlice } from "@reduxjs/toolkit";

/* const initialState = {
    authenticated: false,
    weightUnit: null,
}
 */

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            const user = action.payload
           // console.log("REDUCER ", user);
            //const {access, refresh} = action.payload;
            //localStorage.setItem("refreshToken", refresh);
            state = user
            return state
        },
        logout: (state, action) => {
            window.localStorage.clear()
            state = {}
            return state
        }
    }
})

export const {
    //login,
    logout,
    setUser,
} = userSlice.actions

export default userSlice.reducer