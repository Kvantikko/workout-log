import { useNavigate } from "react-router-dom"
import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"
import userService from "../../services/user"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"
import { Typography, Link, Box, Button, FormLabel, TextField } from "@mui/material"

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [typography, setTypography] = useState(["Login", "Don't have an account? ", "Register"])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (event) => {
        event.preventDefault()

        let response

        if (typography[0] === "Login") {
            response = await handleLogin()
        } else {
            response = await handleRegister()
        }

        window.localStorage.setItem('loggedUser', JSON.stringify(response.user))
        window.localStorage.setItem('userToken', response.token) //JSON.stringify adds quotation marks, why enven use it?

        exerciseService.setToken(response.token)
        workoutService.setToken(response.token)
        //userService.setToken(response.token)

        dispatch(setUser(response.user))
        navigate('/')
    }

    const handleLogin = async () => {
        const response = await loginService.login(email, password)
        return response
    }

    const handleRegister = async () => {
        const response = await loginService.register(email, firstname, lastname, password)
        return response
    }

    const handleTypographyChange = () => {
        if (typography[0] === "Login") {
            setTypography(["Register", "Already have an account? ", "Login"])
        } else {
            setTypography(["Login", "Don't have an account? ", "Register"])
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            //justifyContent="top"
            alignItems="center"
            //minHeight="75vh"
            //minWidth="75vh"
            paddingX={3}
            gap={3}
        //maxWidth="75vw"
        //sx={{ maxWidth: 600 }}
        //minHeight="75vh"
        >
            <Typography variant="h4" textAlign="center">WORKOUT LOG</Typography>
            <Typography variant="h5">{typography[0]}</Typography>
            <form onSubmit={onSubmit}>
                <div>
                    <FormLabel>Email</FormLabel>
                    <div><TextField size="small"  onChange={(event) => setEmail(event.target.value)}/></div>
                    {/* <input onChange={(event) => setEmail(event.target.value)} /> */}
                </div>
                <div>
                    {(typography[0] === "Register") &&
                        <div>
                            <div>
                                <FormLabel>Firstname</FormLabel>
                                <div><TextField onChange={(event) => setFirstname(event.target.value)}  size="small" /></div>
                                {/* <input onChange={(event) => setFirstname(event.target.value)} /> */}
                            </div>
                            <div>
                                <FormLabel>Lastname</FormLabel>
                                <div><TextField onChange={(event) => setLastname(event.target.value)} size="small" /></div>
                                {/* <input onChange={(event) => setLastname(event.target.value)} /> */}
                            </div>
                        </div>
                    }
                </div>
                <div>
                    <FormLabel>Password</FormLabel>
                    <div><TextField onChange={(event) => setPassword(event.target.value)} type='password' size="small" /></div>
                    {/* <input onChange={(event) => setPassword(event.target.value)} type='password' /> */}
                </div>
                <Button type="submit" variant="contained" sx={{ marginTop: 2}} >{typography[0]}</Button>
            </form>
            <Typography>{typography[1]}
                <Link onClick={handleTypographyChange}>{typography[2]}</Link>
            </Typography>
        </Box>
    )
}

export default Login