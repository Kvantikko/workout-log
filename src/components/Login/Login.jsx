import { useState } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"

import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"
import userService from "../../services/user"

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

import { toast } from "react-toastify"

const Login = (props) => {
  


    const [typography, setTypography] = useState(["Login", "Don't have an account? ", "Register"])

    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState('')
    const [errorFirstname, setErrorFirstname] = useState('')
    const [errorLastname, setErrorLastname] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const inputFieldsValid = () => {
        let valid = true
        if (password.length < 8) {
            setErrorPassword('Minimum of 8 characters')
            valid = false
        }
        if (email === '') {
            setErrorEmail('Required')
            valid = false
        }
        if (firstname === '' && typography[0] === "Register") {
            setErrorFirstname('Required')
            valid = false
        }
        if (lastname === '' && typography[0] === "Register") {
            setErrorLastname('Required')
            valid = false
        }
        if (password === '') {
            setErrorPassword('Required')
            valid = false
        }
        return valid
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!inputFieldsValid()) {
            return
        }

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
        userService.setToken(response.token)

        dispatch(setUser(response.user))
        navigate('/')
        toast.success("Logged in!")
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

    const handleLayoutChange = () => {
        if (typography[0] === "Login") {
            setTypography(["Register", "Already have an account?", "Login"])
        } else {
            setTypography(["Login", "Don't have an account?", "Register"])
        }
        setErrorEmail('')
        setErrorFirstname('')
        setErrorLastname('')
        setErrorPassword('')
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
            //sx={{ backgroundColor: 'black' }}
        >
            <Typography variant="h4" textAlign="center">WORKOUT LOG</Typography>
            <Typography variant="h5">{typography[0]}</Typography>
            <form onSubmit={onSubmit}>
                <Stack spacing={2} >
                    <TextField
                        id='email'
                        label='Email Adress *'
                        size="small"
                        onChange={(event) => setEmail(event.target.value)}
                        onClick={(event) => handleEmailAndPassClick(event.target.id)}
                        error={!(errorEmail === '')}
                        helperText={errorEmail}
                        fullWidth={true}
                        autoComplete="off"
                    //sx={{ width: 1}}
                    />
                    {(typography[0] === "Register") &&
                        <>
                            <TextField
                                id='firstname'
                                label='Firstname *'
                                size="small"
                                onChange={(event) => setFirstname(event.target.value)}
                                onClick={() => setErrorFirstname('')}
                                error={!(errorFirstname === '')}
                                helperText={errorFirstname}
                            />
                            <TextField
                                id='lastname'
                                label='Lastname *'
                                size="small"
                                onChange={(event) => setLastname(event.target.value)}
                                onClick={() => setErrorLastname('')}
                                error={!(errorLastname === '')}
                                helperText={errorLastname}
                            />
                        </>
                    }
                    <TextField
                        id='password'
                        type={showPassword ? "text" : "password"}
                        label='Password *'
                        size="small"
                        onChange={(event) => setPassword(event.target.value)}
                        onClick={(event) => handleEmailAndPassClick(event.target.id)}
                        error={!(errorPassword === '')}
                        helperText={errorPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        //onMouseDown={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 4 }}
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