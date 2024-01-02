import { useState } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"

import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"
import userService from "../../services/user"
import templateService from "../../services/templates"

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

import { useMediaQuery } from '@mui/material'


import { toast } from "react-toastify"
import FormButtons from "../Buttons/FormButtons"

const UserForm = ({ user, onCancel, submitButton }) => {

    const [email, setEmail] = useState(user ? user.email : "")
    const [firstname, setFirstname] = useState(user ? user.firstname : "")
    const [lastname, setLastname] = useState(user ? user.lastname : "")

    const [errorEmail, setErrorEmail] = useState('')
    const [errorFirstname, setErrorFirstname] = useState('')
    const [errorLastname, setErrorLastname] = useState('')

    const isSmallScreen = useMediaQuery('(max-width:900px)')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const inputFieldsValid = () => {
        let valid = true
        if (email === '') {
            setErrorEmail('Required')
            valid = false
        }
        if (firstname === '') {
            setErrorFirstname('Required')
            valid = false
        }
        if (lastname === '') {
            setErrorLastname('Required')
            valid = false
        }
        return valid
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        if (user.email === "julkinen@mail.com") {
            toast.info('The details of public account julkinen@mail.com cannot be changed!')
            return
        }

        if (!inputFieldsValid()) return

        try {
            //const response = await loginService.register(email, firstname, lastname, password)
            const response = await userService.editUser(user.email, email, firstname, lastname)
            window.localStorage.setItem('loggedUser', JSON.stringify(response.user))
            window.localStorage.setItem('userToken', response.token) //JSON.stringify adds quotation marks, why enven use it?

            exerciseService.setToken(response.token)
            workoutService.setToken(response.token)
            userService.setToken(response.token)
            templateService.setToken(response.token)

            dispatch(setUser(response.user))
            //navigate('/')
            toast.success("Account updated")
            onCancel()
        } catch (err) {
            console.log(err);
            if (err.response.status === 409) {
                //toast.error(err.response.data.message)
                setErrorEmail(err.response.data.message)
            }
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <Stack
                spacing={2}
                //paddingBottom={4}
                //width={'max-content'}
                //minWidth="100vw"
                sx={{}}
            >
                <TextField
                    id='email'
                    label='Email Adress'
                    value={email}
                    size="small"
                    onChange={(event) => setEmail(event.target.value)}
                    onClick={() => setErrorEmail('')}
                    error={!(errorEmail === '')}
                    helperText={errorEmail}
                    fullWidth={true}
                //sx={{ width: 1}}
                />
                <TextField
                    id='firstname'
                    label='Firstname'
                    value={firstname}
                    size="small"
                    onChange={(event) => setFirstname(event.target.value)}
                    onClick={() => setErrorFirstname('')}
                    error={!(errorFirstname === '')}
                    helperText={errorFirstname}
                />
                <TextField
                    id='lastname'
                    label='Lastname'
                    value={lastname}
                    size="small"
                    onChange={(event) => setLastname(event.target.value)}
                    onClick={() => setErrorLastname('')}
                    error={!(errorLastname === '')}
                    helperText={errorLastname}
                />
            </Stack>

            <FormButtons onCancel={onCancel}/>

        </form>
    )
}

export default UserForm