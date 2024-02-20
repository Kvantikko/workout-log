import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { login, register } from "../../redux/reducers/userReducer"

import { TextField, Stack } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import LoginIcon from '@mui/icons-material/Login'

import PasswordField from "../Inputs/PasswordField"

const LoginRegisterForm = ({ showRegister, buttonText }) => {

    //console.log("Rendering Form");

    const [form, setForm] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: { value: "", isVisible: false },
        passwordAgain: { value: "", isVisible: false }
    })
    const [error, setError] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        passwordAgain: ""
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clearErrors = () => {
        setError({
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            passwordAgain: ""
        })
    }

    useEffect(() => {
        clearErrors()
    }, [showRegister])

    const inputFieldsValid = () => {
        let errorMessages = error

        if (showRegister && form.passwordAgain !== form.password) {
            errorMessages = { ...errorMessages, passwordAgain: `Retyped password doesn't match the given password` }
        }
        if (form.password.length < 8) {
            errorMessages = { ...errorMessages, password: `Minimum of 8 characters` }
        }
        if (showRegister && form.passwordAgain.length < 8) {
            errorMessages = { ...errorMessages, passwordAgain: `Minimum of 8 characters` }
        }
        if (form.email === '') {
            errorMessages = { ...errorMessages, email: `Required` }
        }
        if (showRegister && form.firstname === '') {
            errorMessages = { ...errorMessages, firstname: `Required` }
        }
        if (showRegister && form.lastname === '') {
            errorMessages = { ...errorMessages, lastname: `Required` }
        }
        if (form.password.value === '') {
            errorMessages = { ...errorMessages, password: `Required` }
        }
        if (showRegister && form.passwordAgain.value === '') {
            errorMessages = { ...errorMessages, passwordAgain: `Required` }
        }

        setError(errorMessages)

        for (let key in errorMessages) {
            if (errorMessages.hasOwnProperty(key) && errorMessages[key] !== "") {
                return false // If any error message is not empty, return false
            }
        }
        return true // If all error messages are empty, return true
    }

    const onSubmit = async (event) => {
        console.log("onSubmit ", form )
        event.preventDefault()
        clearErrors()
        if (!inputFieldsValid()) return
        if (showRegister) {
            dispatch(register(form.email, form.firstname, form.lastname, form.password, error, setError, setLoading, navigate))
        } else {
            dispatch(login(form.email, form.password, error, setError, setLoading, navigate))
        }
    }

    const handleEmailAndPassClick = (inputFieldId) => {
        if (error.email === 'Invalid email or password.' &&
            error.password === 'Invalid email or password.'
        ) {
            setError({ ...error, email: "", password: "" })
            return
        }
        if (inputFieldId === 'email') setError({ ...error, email: "" })
        if (inputFieldId === 'password') setError({ ...error, password: "" })
    }

    const toggleShowPassword = () => {
        if (form.password.isVisible) {
            setForm({ ...form, password: { value: form.password.value, isVisible: false } })
        } else {
            setForm({ ...form, password: { value: form.password.value, isVisible: true } })
        }
    }

    const toggleShowPasswordAgain = () => {
        if (form.passwordAgain.isVisible) {
            setForm({ ...form, passwordAgain: { value: form.passwordAgain.value, isVisible: false } })
        } else {
            setForm({ ...form, passwordAgain: { value: form.passwordAgain.value, isVisible: false } })
        }
    }

    return (

        <form onSubmit={onSubmit}>
            <Stack spacing={2} >
                <TextField
                    id='email'
                    label='Email Adress'
                    size="small"
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    onClick={(event) => handleEmailAndPassClick(event.target.id)}
                    error={!(error.email === '')}
                    helperText={error.email}
                    fullWidth={true}
                    autoComplete="off"
                />
                {showRegister &&
                    <>
                        <TextField
                            id='firstname'
                            label='Firstname'
                            size="small"
                            onChange={(event) => setForm({ ...form, firstname: event.target.value })}
                            onClick={() => setErrorFirstname('')}
                            error={!(error.firstname === '')}
                            helperText={error.firstname}
                        />
                        <TextField
                            id='lastname'
                            label='Lastname'
                            size="small"
                            onChange={(event) => setForm({ ...form, lastname: event.target.value })}
                            onClick={() => setError({ ...error, lastname: "" })}
                            error={!(error.lastname === '')}
                            helperText={error.lastname}
                        />
                    </>
                }
                <PasswordField
                    id='password'
                    label="Password"
                    showPassword={form.password.isVisible}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    onClick={handleEmailAndPassClick}
                    onVisibilityClick={toggleShowPassword}
                    error={!(error.password === '')}
                    helperText={error.password}
                />
                {showRegister &&
                    <PasswordField
                        id='passwordAgain'
                        label="Retype password"
                        showPassword={form.passwordAgain.isVisible}
                        onChange={(event) => setForm({ ...form, passwordAgain: event.target.value })}
                        onClick={handleEmailAndPassClick}
                        onVisibilityClick={toggleShowPasswordAgain}
                        error={!(error.passwordAgain === '')}
                        helperText={error.passwordAgain}
                    />
                }
                <LoadingButton
                    type="submit"
                    endIcon={<LoginIcon />}
                    loadingPosition="end"
                    loading={loading}
                    variant="contained"
                >
                    {loading ?
                        <span>{showRegister ? "Registering..." : "Logging in..."}</span> :
                        <span>{showRegister ? "Register" : "Login"}</span>
                    }
                </LoadingButton>
            </Stack>
        </form>

    )
}

export default LoginRegisterForm