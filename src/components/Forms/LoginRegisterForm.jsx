import { useState,useEffect } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"

import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"
import userService from "../../services/user"
import templateService from "../../services/templates"
import measurementService from "../../services/measurements"


import {
    Typography,
    Link,
    Box,
    Button,
    FormLabel,
    TextField,
    Stack,
    InputAdornment,
    IconButton,
} from "@mui/material"

import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import PasswordField from "../Inputs/PasswordField"

import { toast } from "react-toastify"

const LoginRegisterForm = ({ showRegister, buttonText }) => {
    console.log("Rendering");

    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    const [errorEmail, setErrorEmail] = useState('')
    const [errorFirstname, setErrorFirstname] = useState('')
    const [errorLastname, setErrorLastname] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorPasswordAgain, setErrorPasswordAgain] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordAgain, setShowPasswordAgain] = useState(false)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clearErrors = () => { 
        setErrorEmail('')
        setErrorFirstname('')
        setErrorLastname('')
        setErrorPassword('')
        setErrorPasswordAgain('')
    }

    useEffect(() => {
        clearErrors()
    }, [showRegister])

    const inputFieldsValid = () => {
        let valid = true
        if (showRegister && passwordAgain !== password) {
            setErrorPasswordAgain(`Retyped password doesn't match the given password`)
            valid = false
        }
        if (password.length < 8) {
            setErrorPassword('Minimum of 8 characters')
            valid = false
        }
        if (showRegister && passwordAgain.length < 8) {
            setErrorPasswordAgain('Minimum of 8 characters')
            valid = false
        }
        if (email === '') {
            setErrorEmail('Required')
            valid = false
        }
        if (showRegister && firstname === '') {
            setErrorFirstname('Required')
            valid = false
        }
        if (showRegister && lastname === '') {
            setErrorLastname('Required')
            valid = false
        }
        if (password === '') {
            setErrorPassword('Required')
            valid = false
        }
        if (showRegister && passwordAgain === '') {
            setErrorPasswordAgain('Required')
            valid = false
        }
        return valid
    }

    const onSubmit = async (event) => {

        event.preventDefault()

        clearErrors()

        if (!inputFieldsValid()) {
            return
        }

        let response

        if (showRegister) {
            response = await handleRegistration()
        } else {
            response = await handleLogin()
        }

        window.localStorage.setItem('loggedUser', JSON.stringify(response.user))
        window.localStorage.setItem('userToken', response.token) //JSON.stringify adds quotation marks, why enven use it?

        exerciseService.setToken(response.token)
        workoutService.setToken(response.token)
        userService.setToken(response.token)
        templateService.setToken(response.token)
        measurementService.setToken(response.token)

        dispatch(setUser(response.user))
        navigate('/')
        //toast.success("Logged in!")
    }

    const handleLogin = async () => {
        try {
            const response = await loginService.login(email, password)
            return response
        } catch (err) {
            if (err.response.status === 401) {
                //toast.error(err.response.data.message)
                setErrorEmail(err.response.data.message)
                setErrorPassword(err.response.data.message)
            }
        }
    }

    const handleRegistration = async () => {
        try {
            const response = await loginService.register(email, firstname, lastname, password)
            return response
        } catch (err) {
            console.log(err);
            if (err.response.status === 409) {
                //toast.error(err.response.data.message)
                setErrorEmail(err.response.data.message)
            }
        }
    }



    const handleEmailAndPassClick = (inputFieldId) => {
        //console.log("handleEmailAndPassClick ", inputFieldId);
        if (errorEmail === 'Invalid email or password.' &&
            errorPassword === 'Invalid email or password.'
        ) {
            setErrorEmail('')
            setErrorPassword('')
            return
        }
        if (inputFieldId === 'email') setErrorEmail('')
        if (inputFieldId === 'password') setErrorPassword('')
    }

    const handleClickShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const handleClickShowPasswordAgain = () => {
        if (showPasswordAgain === true) {
            setShowPasswordAgain(false)
        } else {
            setShowPasswordAgain(true)
        }
    }


    return (

        <form onSubmit={onSubmit}>
            <Stack spacing={2} >
                <TextField
                    id='email'
                    label='Email Adress'
                    size="small"
                    onChange={(event) => setEmail(event.target.value)}
                    onClick={(event) => handleEmailAndPassClick(event.target.id)}
                    error={!(errorEmail === '')}
                    helperText={errorEmail}
                    fullWidth={true}
                    autoComplete="off"
                //sx={{ width: 1}}
                />
                {showRegister &&
                    <>
                        <TextField
                            id='firstname'
                            label='Firstname'
                            size="small"
                            onChange={(event) => setFirstname(event.target.value)}
                            onClick={() => setErrorFirstname('')}
                            error={!(errorFirstname === '')}
                            helperText={errorFirstname}
                        />
                        <TextField
                            id='lastname'
                            label='Lastname'
                            size="small"
                            onChange={(event) => setLastname(event.target.value)}
                            onClick={() => setErrorLastname('')}
                            error={!(errorLastname === '')}
                            helperText={errorLastname}
                        />
                    </>
                }
                <PasswordField
                    id='password'
                    label="Password"
                    showPassword={showPassword}
                    onChange={setPassword}
                    onClick={handleEmailAndPassClick}
                    onVisibilityClick={handleClickShowPassword}
                    error={!(errorPassword === '')}
                    helperText={errorPassword}
                />
                {showRegister &&
                    <PasswordField
                        id='passwordAgain'
                        label="Retype password"
                        showPassword={showPasswordAgain}
                        onChange={setPasswordAgain}
                        onClick={handleEmailAndPassClick}
                        onVisibilityClick={handleClickShowPasswordAgain}
                        error={!(errorPasswordAgain === '')}
                        helperText={errorPasswordAgain}
                    />
                }

                <Button type="submit" variant="contained" sx={{ marginTop: 4 }} >
                    <Stack direction={'row'} spacing={2}>
                        <div>{buttonText}</div>
                        <LoginIcon />
                    </Stack>
                </Button>

            </Stack>
        </form>

    )
}

export default LoginRegisterForm