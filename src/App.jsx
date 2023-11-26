import exerciseService from './services/exercises'
import workoutService from './services/workouts'
import userService from "./services/user"

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { setExercises } from './redux/reducers/exerciseLibraryReducer'
import { setWorkouts } from './redux/reducers/historyReducer'

import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Workout from './components/Workout/Workout'
import Exercises from './components/Exercises/Exercises'
import Exercise from './components/Exercise/Exercise'
import History from './components/History/History'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import HistoryId from './components/HistoryId/HistoryId'

import StopWatch from './components/Clock/StopWatch'

import { jwtDecode } from 'jwt-decode';

import {
    Routes,
    Route,
    Navigate,
    useMatch,
    useNavigate,
} from "react-router-dom"

import axios from 'axios'

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ReactToastifyOverride.css'

import BottomNavBar from './components/Navbar/BottomNavBar'
import HideAppBar from './components/AppBar/HideAppBar'

import { setUser } from "./redux/reducers/userReducer"
import Measurements from './components/Measurements/Measurements';

import { logout } from './redux/reducers/userReducer';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, Drawer, Typography, Divider, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TemporaryDrawer from './components/Navbar/TemporaryDrawer';
import PermanentDrawerLeft from './components/Navbar/PermanentDrawerLeft';
import { AddBoxOutlined } from '@mui/icons-material';

/* const theme = createTheme({
    palette: {
        primary: {
            main: '#525252', // set your custom primary color
        },
        secondary: {
            main: '#00ff00', // set your custom secondary color
        },
        background: {
            default: '#1F1B24', // set your default background color
        },
        text: {
            primary: '#ffffff', // set your primary text color
        },
        // Add more customizations as needed
    },
    typography: {
        fontFamily: 'Arial, sans-serif', // set your custom font family
    },
    // Add other theme configurations here
}); */



// '#1F1B24'


import useMediaQuery from '@mui/material/useMediaQuery';









/* vois kyllä tehddä modalin jossa on nappi ja ei haittaa että menu jää taustalle

 */





const App = () => {
    console.log("rendering App.jsx");
    
    // STATE
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const user = useSelector(state => state.user)
    const authenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?
    
    // HOOKS
    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const isSmallScreen = useMediaQuery('(min-width:900px)');

    // CONSTANTS
    const [drawerWidth, setdrawerWidth] = useState(250)
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        zIndex: {
            //appBar: 0,
            //modal: 1250,
            //drawer: 0
        },
        //isSmallScreen
    });
    const darkMode = true //useSelector(state => state.darkMode)





    // useEffect suoritetaan heti komponentin renderöinnin jälkeen.
    // Oletusarvoisesti useEeffect suoritetaan aina komponentin renderöinnin jälkeen
    // useEffect funktio saa kaksi parametria:
    // 1: "hook" funktio
    // 2: toista parametria käytetään tarkentamaan sitä, miten usein efekti suoritetaan.
    // Jos toisena parametrina on tyhjä taulukko [], suoritetaan efekti ainoastaan komponentin ensimmäisen renderöinnin jälkeen.
    useEffect(() => {

        if (authenticated) {
            console.log("EFFECT WORKOUTS AUTH TRUE");
            workoutService
                .getAllUserWorkouts(user.email)
                .then((response) => {
                    const workouts = response
                    // console.log("EFFECT workouts response: ", workouts);
                    dispatch(setWorkouts(workouts))
                })
                .catch(error => {
                    //alert("tapahtui virhe hakiessa kaikkia liikkeitä")
                    console.log('error: ', error);
                })

        }

        // axios.get palauttaa promise olion
        // Takaisinkutsun rekisteröinti tapahtuu antamalla promisen then-metodille käsittelijäfunktio (response)... ymmärsinlö oikein

    }, [authenticated])

    useEffect(() => {
        // console.log("EFFECT EXERCISES");
        if (authenticated) {
            //console.log("EFFECT EXERCISES AUTH TRUE");
            exerciseService
                .getAll()
                .then((initialExercises) => {
                    dispatch(setExercises(initialExercises)) // redux storeen
                })
                .catch(error => {
                    //alert("tapahtui virhe hakiessa kaikkia liikkeitä")
                    console.log('error: ', error);
                })
        }

    }, [authenticated])

    useEffect(() => {
        console.log("EFFECT");
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        console.log(loggedUserJSON);
        const token = window.localStorage.getItem('userToken')
        //console.log("TOken FROM LOC STORage ", token);
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            exerciseService.setToken(token)
            workoutService.setToken(token)
            userService.setToken(token)
            //Service.setToken(token)
            navigate('/')
        }
    }, [])



    const exercises = useSelector(state => state.exerciseLibrary)
    const match = useMatch('/exercises/:id')
    const exercise = match
        ? exercises.find(exercise => exercise.id === Number(match.params.id))
        : null

    const workouts = useSelector(state => state.history)
    const matchHistory = useMatch('/history/:id')
    const workout = matchHistory
        ? workouts.find(workout => workout.id === Number(matchHistory.params.id))
        : null

    const margin = () => {
        if (!stopWatchIsActive) {
            return 70
        } else {
            return 0
        }
    }

    const ProtectedRoute = ({ children }) => {
        if (!authenticated) {
            return <Navigate to="/login" />
        }

        const isTokenExpired = () => {
            const token = window.localStorage.getItem('userToken')
            const decodedToken = jwtDecode(token)
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
            return Date.now() > expirationTime
        }

        if (isTokenExpired()) {
            dispatch(logout())
            //navigate('/')
            toast.warning('Your session has timed out! For security reasons you need to log in again.')
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <ThemeProvider theme={darkMode ? darkTheme : theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>




                <Box sx={{ display: 'flex', marginTop: 0 }}  >
                    {/*  <HideAppBar drawerWidth={drawerWidth} ></HideAppBar> */}
                    {authenticated && <PermanentDrawerLeft drawerWidth={drawerWidth} />}


                    <Box
                        component="main"
                        sx={{ flexGrow: 1 }}
                    >
                        <Toolbar />  {/* // for margin */}


                        <Routes>
                            <Route
                                path="/workout"
                                element={<ProtectedRoute>
                                    <Workout
                                        user={user}
                                        //style={{ margin: '110' }}
                                        drawerWidth={drawerWidth}
                                    />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/history/:id"
                                element={<ProtectedRoute>
                                    <HistoryId workout={workout} drawerWidth={drawerWidth} />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/history"
                                element={<ProtectedRoute>
                                    <History drawerWidth={drawerWidth} />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/exercises/:id"
                                element={<ProtectedRoute>
                                    <Exercise exercise={exercise} drawerWidth={drawerWidth} />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/exercises"
                                element={<ProtectedRoute>
                                    <Exercises drawerWidth={drawerWidth} />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/measure"
                                element={<ProtectedRoute>
                                    <Measurements drawerWidth={drawerWidth} />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/profile"
                                element={<ProtectedRoute>
                                    <Profile user={user} drawerWidth={drawerWidth} />
                                </ProtectedRoute>} />
                            <Route
                                path="/"
                                element={<ProtectedRoute>
                                    <Navigate to="/workout" />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/login"
                                element={<Login />}
                            />
                        </Routes>
                        <ToastContainer
                            className="toast-position"
                            position="bottom-right"
                            autoClose={4000}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme={darkMode ? 'dark' : 'light'}
                        />
                    </Box>



                </Box>
                {authenticated && <BottomNavBar />}



            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default App
