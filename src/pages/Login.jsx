import { useState, useEffect } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"

import loginService from "../services/login"
import workoutService from "../services/workouts"
import exerciseService from "../services/exercises"
import userService from "../services/user"
import templateService from "../services/templates"

import LoginImage from "../assets/gym.webp"


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
    ThemeProvider,
    createTheme
} from "@mui/material"

import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { toast } from "react-toastify"
import LoginRegisterForm from "../components/Forms/LoginRegisterForm"

const theme = createTheme({
    typography: {
        fontFamily: ["Tourney", "italic"].join(","),
    },
});

const Login = () => {
    console.log("Rendering Login ",)

    const [showRegister, setShowRegister] = useState(false)
    const [typography, setTypography] = useState(
        showRegister ?
            ["Register", "Already have an account?"] :
            ["Login", "Don't have an account? "]
    )

    useEffect(() => {
        setTypography(
            showRegister ?
                ["Register", "Already have an account?", "Login"] :
                ["Login", "Don't have an account? ", "Register"]
        )
    }, [showRegister]);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleLayout = () => {
        if (showRegister) {
            setShowRegister(false)
        } else {
            setShowRegister(true)
        }
    }

    return (
        <Box
            display='flex'
            flexDirection='row'
        >
            <Box
                minWidth="50%"
                sx={{
                    display: { xs: "none", md: "block", },
                    height: "100vh",
                    backgroundImage: `url(${LoginImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign={'center'}
                justifyContent="center"
                paddingX={3}
                paddingY={10}
                gap={3}
                width={"100%"}
                direction={'row'}
                flexWrap={'wrap'}
                flexGrow={2}
            >
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" textAlign="center">WORKOUT LOG</Typography>
                </ThemeProvider>

                <Typography variant="h5">{typography[0]}</Typography>
                <LoginRegisterForm
                    buttonText={typography[0]}
                    showRegister={showRegister}
                />
                <Typography>
                    {typography[1]}
                    <Button onClick={toggleLayout}><Link >{typography[2]}</Link></Button>
                </Typography>
                {!showRegister &&
                    <Stack alignItems='left' justifyContent={'left'} textAlign={'left'} width={265} spacing={0.5}>
                        <Typography variant="h6" paddingBottom={1} paddingTop={5}>
                            Public account for visitors
                        </Typography>
                        <Typography variant="body1" color="text.secondary" >
                            email: julkinen@mail.com
                        </Typography>
                        <Typography variant="body1" color="text.secondary" >
                            password: salainen
                        </Typography>
                    </Stack>
                }

            </Box>
        </Box>
    )
}

export default Login