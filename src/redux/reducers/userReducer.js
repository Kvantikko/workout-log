import { createSlice, createAction } from "@reduxjs/toolkit"
import loginService from "../../services/login"
import exerciseService from "../../services/exercises"
import workoutService from "../../services/workouts"
import userService from "../../services/user"
import templateService from "../../services/templates"
import measurementService from "../../services/measurements"
import { toast } from "react-toastify"
import { CircularProgress } from "@mui/material"

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

export const login = (email, password, error, setError, setLoading, navigate) => {
    return async (dispatch) => {
        let toastId
        let timeoutId
        try {
            setLoading(true)
            timeoutId = setTimeout(() => {
                toastId = toast(
                    "My free server has spun down and needs to restart. This might take a minute or two. Please wait...", {
                    autoClose: false,
                    position: "top-right",
                    style: { backgroundColor: "#c21313" },
                    isLoading: true,
                    closeButton: false,
                    closeOnClick: false,
                    draggable: false
                })
            }, 8000)
            const response = await loginService.login(email, password)
            dispatch(setCredentials({ user: response.user, token: response.token }))
            navigate('/')
        } catch (err) {
            if (err.response?.status === 401) {
                setError({ ...error, email: err.response?.data.message, password: err.response?.data.message })
            }
            //toast.error(err.response?.data.message, { autoClose: false })
        }
        setLoading(false)
        clearTimeout(timeoutId)
        toast.update(toastId, {
            render: "Logged in, thank you for being patient!",
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            closeButton: true,
            closeOnClick: true,
            draggable: true,
            style: { backgroundColor: "#474747" },
            autoClose: 4000
        })
    }
}

export const register = (email, firstname, lastname, password, error, setError, setLoading, navigate) => {
    return async (dispatch) => {
        try {
            setLoading(true)
            const response = await loginService.register(email, firstname, lastname, password)
            dispatch(setCredentials({ user: response.user, token: response.token }))
            navigate('/')
        } catch (err) {
            if (err.response?.status === 409) {
                setError({ ...error, email: err.response?.data.message })
            }
            toast.error(err.response?.data.message)
        }
        setLoading(false)
    }
}

export const logout = createAction("RESET")