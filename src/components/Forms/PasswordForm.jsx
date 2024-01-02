import { useState } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"

import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"
import userService from "../../services/user"
import templateService from "../../services/templates"
import FormButtons from "../Buttons/FormButtons"
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
import PasswordField from "../Inputs/PasswordField"

const PasswordForm = ({ user, submitButton, onCancel }) => {

    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    const [errorPassword, setErrorPassword] = useState('')
    const [errorPasswordAgain, setErrorPasswordAgain] = useState('')
    console.log(errorPassword);

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordAgain, setShowPasswordAgain] = useState(false)

    const isSmallScreen = useMediaQuery('(max-width:900px)')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const inputFieldsValid = () => {
        setErrorPasswordAgain('')
        setErrorPassword('')

        let valid = true
        if (passwordAgain !== password) {
            setErrorPasswordAgain(`Retyped password doesn't match the new password`)
            valid = false
        }
        if (password.length < 8) {
            setErrorPassword('Minimum of 8 characters')
            valid = false
        }
        if (passwordAgain.length < 8) {
            setErrorPasswordAgain('Minimum of 8 characters')
            valid = false
        }
        if (password === '') {
            console.log("totta");
            setErrorPassword('Required')
            valid = false
        }
        if (passwordAgain === '') {
            setErrorPasswordAgain('Required')
            valid = false
        }
        return valid
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        if (user.email === "julkinen@mail.com") {
            toast.info('The password of public account julkinen@mail.com cannot be changed!')
            return
        }

        if (!inputFieldsValid()) return

        try {
            const response = await userService.editPassword(user.email, password, passwordAgain)
              window.localStorage.setItem('loggedUser', JSON.stringify(response.user))
              window.localStorage.setItem('userToken', response.token) //JSON.stringify adds quotation marks, why enven use it?
  
              exerciseService.setToken(response.token)
              workoutService.setToken(response.token)
              userService.setToken(response.token)
              templateService.setToken(response.token)
  
              dispatch(setUser(response.user))
              //navigate('/')
              toast.success("Password updated")
              onCancel()
          } catch (err) {
              console.log(err);
          }


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
            <Stack
                spacing={2}
                //width={'max-content'}
                //minWidth="100vw"
                sx={{}}
            >
                <PasswordField
                    id='newPassword'
                    label="New password"
                    showPassword={showPassword}
                    onChange={setPassword}
                    onVisibilityClick={handleClickShowPassword}
                    error={!(errorPassword === '')}
                    helperText={errorPassword}
                />
                <PasswordField
                    id='newPasswordAgain'
                    label="Retype new password"
                    showPassword={showPasswordAgain}
                    onChange={setPasswordAgain}
                    onVisibilityClick={handleClickShowPasswordAgain}
                    error={!(errorPasswordAgain === '')}
                    helperText={errorPasswordAgain}
                />
                {/* <TextField
                    id='password'
                    type={showPassword ? "text" : "password"}
                    label={"New password"}
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
                /> */}
              {/*   <TextField
                    id='passwordAgain'
                    type={showPasswordAgain ? "text" : "password"}
                    label={"Retype new password"}
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
                /> */}
                

            </Stack>

            <FormButtons onCancel={onCancel}/>

        </form>
    )
}

export default PasswordForm