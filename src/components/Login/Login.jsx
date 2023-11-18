import { useNavigate } from "react-router-dom"
import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"
import userService from "../../services/user"

import { toast } from "react-toastify"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"
import { Typography, Link, Box, Button, FormLabel, TextField, Stack } from "@mui/material"

import LoginIcon from '@mui/icons-material/Login';

const Login = (props) => {
    const [typography, setTypography] = useState(["Login", "Don't have an account? ", "Register"])

    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState(false)
    const [errorFirstname, setErrorFirstname] = useState(false)
    const [errorLastname, setErrorLastname] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (event) => {
        event.preventDefault()

        let response

        if (typography[0] === "Login") {
            response = await handleLogin()
        } else {
            response = await handleRegistration()
        }

        window.localStorage.setItem('loggedUser', JSON.stringify(response.user))
        window.localStorage.setItem('userToken', response.token) //JSON.stringify adds quotation marks, why enven use it?

        exerciseService.setToken(response.token)
        workoutService.setToken(response.token)

        dispatch(setUser(response.user))
        navigate('/')
        toast.success("Logged in!")
    }

    const handleLogin = async () => {
        try {
            const response = await loginService.login(email, password)
            return response
        } catch (err) {
            toast.error(err.response.data.message)
            setErrorEmail(true)
            setErrorPassword(true)
        }
    }

    const handleRegistration = async () => {
        try {
            const response = await loginService.register(email, firstname, lastname, password)
            return response
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
            if (email === '') {
                setErrorEmail(true)
            }
            if (err.response.status === 409) {
                setErrorEmail(true)
            }
            if (firstname === '') {
                setErrorFirstname(true)
            }
            if (lastname === '') {
                setErrorLastname(true)
            }
            if (password === '') {
                setErrorPassword(true)
            }
            if (password.length < 8) {
                setErrorPassword(true)
            }
        }
    }



    const handleLayoutChange = () => {
        if (typography[0] === "Login") {
            setTypography(["Register", "Already have an account?", "Login"])
        } else {
            setTypography(["Login", "Don't have an account?", "Register"])
        }
        setErrorEmail(false)
        setErrorFirstname(false)
        setErrorLastname(false)
        setErrorPassword(false)
    }

    const renderPasswordHelperText = () => {
        console.log("rendering password");
        if (errorPassword && (password === '')) {
            console.log("kaka");
            return "Required"
        }
        if (errorPassword && (password.length < 8)) {
            console.log("masaka");
            return "Minimum of 8 characters"
        }
        return ''
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign={'center'}

            justifyContent="center"
            //minHeight="80vh"
            //minWidth="75vh"
            paddingX={3}
            gap={3}
        >
            <Typography variant="h4" textAlign="center">WORKOUT LOG</Typography>
            <Typography variant="h5">{typography[0]}</Typography>
            <form onSubmit={onSubmit}>
                <Stack spacing={2}>
                    <TextField
                        id='email'
                        label='Email'
                        size="small"
                        onChange={(event) => setEmail(event.target.value)}
                        onClick={() => setErrorEmail(false)}
                        error={errorEmail}
                        helperText={(errorEmail && email === '') ? "Required" : ""}
                    />
                    {(typography[0] === "Register") &&
                        <>
                            <TextField
                                id='firstname'
                                label='Firstname'
                                size="small"
                                onChange={(event) => setFirstname(event.target.value)}
                                onClick={() => setErrorFirstname(false)}
                                error={errorFirstname}
                                helperText={(errorFirstname && firstname === '') ? "Required" : ""}
                            />
                            <TextField
                                id='lastname'
                                label='Lastname'
                                size="small"
                                onChange={(event) => setLastname(event.target.value)}
                                onClick={() => setErrorLastname(false)}
                                error={errorLastname}
                                helperText={(errorLastname && lastname === '') ? "Required" : ""}
                            />
                        </>
                    }
                    <TextField
                        type='password'
                        label='Password'
                        size="small"
                        onChange={(event) => setPassword(event.target.value)}
                        onClick={() => setErrorPassword(false)}
                        error={errorPassword}
                        helperText={renderPasswordHelperText()}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 2 }}
                    >
                        <Stack direction={'row'} spacing={2}>
                            <div>{typography[0]}</div>
                            <LoginIcon />
                        </Stack>
                    </Button>
                </Stack>
            </form>
            <Typography>{typography[1]}
                <Button><Link onClick={handleLayoutChange}>{typography[2]}</Link></Button>
            </Typography>
        </Box>
    )
}

export default Login