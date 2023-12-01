import exerciseService from './services/exercises'
import workoutService from './services/workouts'
import userService from "./services/user"

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { setExercises } from './redux/reducers/exerciseLibraryReducer'
import { setWorkouts } from './redux/reducers/historyReducer'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from 'react-redux'

import Workout from './components/Home/Home'
import Exercises from './components/Exercises/Exercises'
import Exercise from './components/Exercise/Exercise'
import History from './components/History/History'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import HistoryId from './components/HistoryId/HistoryId'

import ProtectedRoute from './components/Router/ProtectedRoute';

import PermanentDrawerRight from './components/Navbar/PermanentDrawerRight';



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
import { AppBar, Box, Container, Drawer, Typography, Divider, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';

import PermanentDrawerLeft from './components/Navbar/PermanentDrawerLeft';
import { AddBoxOutlined } from '@mui/icons-material';

import { CssBaseline } from '@mui/material';

import ActiveWorkout from './components/Workout/Workout';

import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableEdgeDrawer from './components/Navbar/SwipeableEdgeDrawer';

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







const App = () => {
    console.log("Rendering App.jsx");

    const isSmallScreen = useMediaQuery('(max-width:1000px)');

    console.log(isSmallScreen);

    // STATE
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    //const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const user = useSelector(state => state.user)
    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?

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

    // HOOKS
    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const isSmallScreen = useMediaQuery('(min-width:900px)');

    // CONSTANTS
    const [drawerWidth, setdrawerWidth] = useState(200)
    const [rightDrawerWidth, setRightDrawerWidth] = useState(500)

    // const darkMode = true //useSelector(state => state.darkMode)



    // useEffect suoritetaan heti komponentin renderöinnin jälkeen.
    // Oletusarvoisesti useEeffect suoritetaan aina komponentin renderöinnin jälkeen
    // useEffect funktio saa kaksi parametria:
    // 1: "hook" funktio
    // 2: toista parametria käytetään tarkentamaan sitä, miten usein efekti suoritetaan.
    // Jos toisena parametrina on tyhjä taulukko [], suoritetaan efekti ainoastaan komponentin ensimmäisen renderöinnin jälkeen.
    useEffect(() => {
        if (isAuthenticated) {
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
    }, [isAuthenticated])

    useEffect(() => {
        // console.log("EFFECT EXERCISES");
        if (isAuthenticated) {
            //console.log("EFFECT EXERCISES AUTH TRUE");
            exerciseService
                .getAll()
                .then((initialExercises) => {
                    dispatch(setExercises(initialExercises))
                })
                .catch(error => {
                    console.log('error: ', error);
                })
        }

    }, [isAuthenticated])

    useEffect(() => {
        //console.log("EFFECT");
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        //console.log(loggedUserJSON);
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





    /*   const margin = () => {
          if (!stopWatchIsActive) {
              return 0
          } else {
              return 10
          }
      }
   */


    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>

           {/*  {workoutStarted && isAuthenticated && (!isSmallScreen) && createPortal(
                <PermanentDrawerRight />,
                document.getElementById('outsideRouter')
            )} */}

          {/*   {workoutStarted && isAuthenticated && (isSmallScreen === true) && createPortal(
                <SwipeableEdgeDrawer />,
                document.body
            )}
 */}



            <Box  sx={{ display: 'flex', marginTop: 0 /* margin() */ }}  >
                {/*  <HideAppBar drawerWidth={drawerWidth} ></HideAppBar> */}
                {isAuthenticated && <PermanentDrawerLeft drawerWidth={drawerWidth} />}


                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        //width: 33,!isSmallScreen ? `calc(100% - ${drawerWidth+500}px)` : '100%' ,
                        minWidth: 400,
                        maxWidth: !isSmallScreen ? `calc(100% - ${drawerWidth+500}px)` : '100%' 
                    }}
                >
                    <Toolbar />  {/* // for margin */}


                    <Routes>
                        <Route
                            path="/"
                            element={<ProtectedRoute  >
                                <Workout
                                    user={user}
                                    //style={{ margin: '110' }}
                                    drawerWidth={drawerWidth}
                                />
                            </ProtectedRoute>}
                        />
                        <Route
                            path="/workout"
                            element={<ProtectedRoute>
                                <ActiveWorkout
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
                        theme={'dark'}
                        toastStyle={{ backgroundColor: "#474747" }}
                    />
                </Box>

                {isAuthenticated && <BottomNavBar />}

            </Box>



            {/* {slowComponent} */}

            {/*  <SwipeableEdgeDrawer /> */}







        </LocalizationProvider>

    )
}

export default App
