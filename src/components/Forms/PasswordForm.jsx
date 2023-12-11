import { useState } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"

import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"
import userService from "../../services/user"

import { useMediaQuery } from '@mui/material'

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

const PasswordForm = ({ user, submitButton, onCancel }) => {


    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    const [errorPassword, setErrorPassword] = useState('')
    const [errorPasswordAgain, setErrorPasswordAgain] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordAgain, setShowPasswordAgain] = useState(false)


    const isSmallScreen = useMediaQuery('(max-width:900px)')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const inputFieldsValid = () => {
        let valid = true
        if (password.length < 8) {
            setErrorPassword('Minimum of 8 characters')
            valid = false
        }
        if (passwordAgain.length < 8) {
            setErrorPassword('Minimum of 8 characters')
            valid = false
        }
        if (password === '') {
            setErrorPassword('Required')
            valid = false
        }
        if (passwordAgain === '') {
            setErrorPassword('Required')
            valid = false
        }
        return valid
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!inputFieldsValid()) return

        try {
            //const response = await loginService.register(email, firstname, lastname, password)
            const response = await userService.editUser(user.email, email, firstname, lastname, password)
            window.localStorage.setItem('loggedUser', JSON.stringify(response.user))
            window.localStorage.setItem('userToken', response.token) //JSON.stringify adds quotation marks, why enven use it?

            exerciseService.setToken(response.token)
            workoutService.setToken(response.token)
            userService.setToken(response.token)

            dispatch(setUser(response.user))
            //navigate('/')
            toast.success("Account updated")
        } catch (err) {
            console.log(err);
        }


    }


    const handlePassClick = (inputFieldId) => {
        if (inputFieldId === 'passwordAgain') setErrorPasswordAgain('')
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
        if (showPasswordAgain) {
            setShowPasswordAgain(false)
        } else {
            setShowPasswordAgain(true)
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <Stack
                spacing={2}
                //width={'max-content'}
                //minWidth="100vw"
                sx={{}}
            >
                <TextField
                    id='password'
                    type={showPassword ? "text" : "password"}
                    label={"Password"}
                    size="small"
                    onChange={(event) => setPassword(event.target.value)}
                    onClick={(event) => handlePassClick(event.target.id)}
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
                <TextField
                    id='passwordAgain'
                    type={showPassword ? "text" : "password"}
                    label={user ? 'New password' : 'Password *'}
                    size="small"
                    onChange={(event) => setPasswordAgain(event.target.value)}
                    onClick={(event) => handlePassClick(event.target.id)}
                    error={!(errorPasswordAgain === '')}
                    helperText={errorPasswordAgain}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle passwordAgain visibility"
                                    onClick={handleClickShowPasswordAgain}
                                //onMouseDown={handleClickShowPassword}
                                >
                                    {showPasswordAgain ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

            </Stack>

            {isSmallScreen &&
                <Box >
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 4 }}
                    >
                        Submit
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onCancel}> Cancel </Button>
                </Box>
            }
            {!isSmallScreen &&
                <Box display={'flex'} flexDirection={'row'} gap={2} justifyContent={'right'} >
                    <Box width={300} />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                       // sx={{ marginTop: 4 }}
                    >
                        Submit
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onCancel}> Cancel </Button>
                </Box>
            }
        </form>
    )
}

export default PasswordForm