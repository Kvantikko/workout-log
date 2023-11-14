import { useNavigate } from "react-router-dom"
import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import exerciseService from "../../services/exercises"


import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"
import { Typography, Link } from "@mui/material"

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
        <div>
            <h1>WORKOUT LOG</h1>
            <h2>{typography[0]}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    email: <div><input onChange={(event) => setEmail(event.target.value)} /></div>
                </div>
                <div>
                    {(typography[0] === "Register") &&
                        <div>
                            <div>
                                firstname:
                                <div>
                                    <input onChange={(event) => setFirstname(event.target.value)} />
                                </div>
                            </div>
                            <div>
                                lastname: <div><input onChange={(event) => setLastname(event.target.value)} /></div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    password: <div><input onChange={(event) => setPassword(event.target.value)} type='password' /></div>
                </div>
                <button type="submit">{typography[0]}</button>
                <Typography>{typography[1]}
                    <Link onClick={handleTypographyChange}>{typography[2]}</Link>
                </Typography>
            </form>
        </div>
    )
}

export default Login