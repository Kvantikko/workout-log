import { useState, useEffect } from "react"

import { useDispatch } from "react-redux"
import { login, register } from "../../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"
import { blink } from "../../utils/Blink"


import {
    Typography,
    Box,
    TextField,
    Stack,
    LinearProgress,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"

import LoginIcon from '@mui/icons-material/Login';

import PasswordField from "../Inputs/PasswordField"




const LoginRegisterForm = ({ showRegister, buttonText }) => {


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

    const [loading, setLoading] = useState(false)
    const [infoText, setInfoText] = useState(null)
    let timeoutId = null


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

    useEffect(() => {
        if (loading) {
            timeoutId = setTimeout(() => {
                setInfoText("My free server has spun down and needs to restart. This might take a minute or two...")
            }, 8000)
        }
        return () => {
            clearTimeout(timeoutId)
            setInfoText(null)
        }
    }, [loading])

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
        if (!inputFieldsValid()) return
        //setLoading(true)
        if (showRegister) {
            dispatch(register(email, firstname, lastname, password, setErrorEmail, setLoading, navigate))
        } else {
            dispatch(login(email, password, setErrorEmail, setErrorPassword, setLoading, navigate))
        }
    }

    const handleEmailAndPassClick = (inputFieldId) => {
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
                {!infoText &&
                    <LoadingButton
                        role="button"
                        id="loginButton"
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
                }
                {loading && infoText &&
                    <Box
                        sx={{
                            maxWidth: 269,
                            borderRadius: 2,
                            padding: infoText ? 1.5 : 0,
                            textAlign: 'center',
                            animation: `${blink} 1s linear infinite alternate`,
                        }}
                    >
                        <LinearProgress fourColor />
                        <Typography textAlign={'center'} paddingTop={1}>
                            {infoText}
                        </Typography>
                    </Box>

                }
            </Stack>
        </form>

    )
}

export default LoginRegisterForm
