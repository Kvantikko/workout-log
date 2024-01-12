import { createSlice, createAction } from "@reduxjs/toolkit"
import loginService from "../../services/login"
import exerciseService from "../../services/exercises"
import workoutService from "../../services/workouts"
import userService from "../../services/user"
import templateService from "../../services/templates"
import measurementService from "../../services/measurements"
import { toast } from "react-toastify"

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setCredentials: (state, action) => {
            const token = action.payload.token
            const user = action.payload.user

            state = user
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            window.localStorage.setItem('userToken', token)

            exerciseService.setToken(token)
            workoutService.setToken(token)
            userService.setToken(token)
            templateService.setToken(token)
            measurementService.setToken(token)

            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            window.localStorage.clear()
            return null
        })
    },
})

export const {
    setCredentials,
} = userSlice.actions

export default userSlice.reducer

export const login = (email, password, setErrorEmail, setErrorPassword, navigate) => {
    return async (dispatch) => {
        try {
            const response = await loginService.login(email, password)
            dispatch(setCredentials({ user: response.user, token: response.token }))
            navigate('/')
        } catch (err) {
            console.log("err", err);
            if (err.response.status === 401) {
                setErrorEmail(err.response.data.message)
                setErrorPassword(err.response.data.message)
            }
            toast.error(err.response.data.message)
        }
    }
}

export const register = (email, firstname, lastname, password, setErrorEmail, navigate) => {
    return async (dispatch) => {
        try {
            const response = await loginService.register(email, firstname, lastname, password)
            dispatch(setCredentials({ user: response.user, token: response.token }))
            navigate('/')
        } catch (err) {
            if (err.response.status === 409) {
                setErrorEmail(err.response.data.message)
            }
            toast.error(err.response.data.message)
        }
    }
}

export const logout = createAction("RESET")