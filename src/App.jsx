import exerciseService from './services/exercises'
import workoutService from './services/workouts'
import userService from "./services/user"
import templateService from "./services/templates"

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { setExercises } from './redux/reducers/exerciseLibraryReducer'
import { setWorkouts } from './redux/reducers/historyReducer'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from 'react-redux'

import Workout from './pages/Home'
import Exercises from './pages/Exercises'
import Exercise from './pages/Exercise'
import History from './pages/History'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Measurements from './pages/Measurements'
import WorkoutDetails from './pages/WorkoutDetails'

import ProtectedRoute from './components/Router/ProtectedRoute'





import {
    Routes,
    Route,
    Navigate,
    useMatch,
    useNavigate,
    useLocation,
} from "react-router-dom"

import axios from 'axios'

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ReactToastifyOverride.css'

import BottomNavBar from './components/Navbar/BottomNavBar'
import HideAppBar from './components/AppBar/HideAppBar'

import { setUser } from "./redux/reducers/userReducer"


import { logout } from './redux/reducers/userReducer';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, Drawer, Typography, Divider, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';

import PermanentDrawerLeft from './components/Navbar/PermanentDrawerLeft';
import { AddBoxOutlined } from '@mui/icons-material';

import { CssBaseline } from '@mui/material';

import ActiveWorkout from './components/Workout/WorkoutContainer';

import { resetWorkoutPath, resetHistory } from './redux/reducers/navReducer';


import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableEdgeDrawer from './components/Drawers/SwipeableEdgeDrawer';
import WorkoutToolbar from './components/Workout/WorkoutToolbar';
import ExpandablePermanentDrawer from './components/Drawers/ExpandablePermanentDrawer';
import LoginProtect from './components/Router/LoginProtect';
import { setTemplates } from './redux/reducers/templateLibraryReducer';
import TemplateMenu from './components/Menus/TemplateMenu';
import HistoryMenu from './components/Menus/HistoryMenu';



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















/*
* IMPORTANT!!!: gets heavy if more exercises, but its okay if one exercise with many sets!!!!!!!!!!!!!!!!!
*/





const App = () => {
    console.log("Rendering App.jsx");

    const isSmallScreen = useMediaQuery('(max-width:1000px)');

    //const isExpanded = useSelector(state => state.drawer)



    // STATE
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    //const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const user = useSelector(state => state.user)
    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?

    const templates = useSelector(state => state.templates)
    const matchTemplate = useMatch('/templates/:id')
    const template = matchTemplate
        ? templates.find(template => template.id === Number(matchTemplate.params.id))
        : null

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
    const location = useLocation()
    //const isSmallScreen = useMediaQuery('(min-width:900px)');

    // CONSTANTS
    const drawerWidth = workoutStarted ?
        { xs: 0, sm: 0, md: 75, lg: 75, xl: 225 }
        :
        { xs: 0, sm: 0, md: 75, lg: 225 }




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
        // console.log("EFFECT EXERCISES");
        if (isAuthenticated) {
            //console.log("EFFECT EXERCISES AUTH TRUE");
            templateService
                .getAllUserTemplates(user.email)
                .then((response) => {
                    const templates = response
                    // console.log("EFFECT workouts response: ", workouts);
                    dispatch(setTemplates(templates))
                })
                .catch(error => {
                    //alert("tapahtui virhe hakiessa kaikkia liikkeitä")
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
            templateService.setToken(token)
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
            {isAuthenticated && <Toolbar /> }
                <Box id='mainContainer' className='mainContainer' sx={{ display: 'flex', marginTop: 0 /* margin() */ }}  >

                    {isAuthenticated && <PermanentDrawerLeft drawerWidth={drawerWidth} />}


                    <Box
                        component="main" id='main'

                        sx={{
                            flexGrow: 1,
                            height: isAuthenticated ? `calc(100vh - ${64}px)` : "100%" ,
                            overflow: 'auto'
                            // width:   `calc(100% - ${+600}px)` ,
                            //marginLeft: 10
                            //width: 33,!isSmallScreen ? `calc(100% - ${drawerWidth+500}px)` : '100%' ,
                            //minWidth: 400,
                            //maxWidth: !isSmallScreen ? `calc(100% - ${drawerWidth+500}px)` : '100%' 
                        }}
                    >


                        {/*  <Typography color="text.secondary" paddingTop={2} paddingLeft={2} >
                        {location.pathname}
                    </Typography> */}

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
                                path="/templates/:id"
                                element={<ProtectedRoute>
                                    {/*  <Template template={template} drawerWidth={drawerWidth} /> */}
                                    <WorkoutDetails
                                        drawerWidth={drawerWidth}
                                        workout={template}
                                        backFunction={() => dispatch(resetWorkoutPath())}
                                        link="/"
                                        startButtonText="Start workout"
                                        menu={
                                            <TemplateMenu workout={template} />
                                        }
                                    />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/history/:id"
                                element={<ProtectedRoute>
                                    {/* <HistoryId workout={workout} drawerWidth={drawerWidth} /> */}
                                    <WorkoutDetails
                                        drawerWidth={drawerWidth}
                                        workout={workout}
                                        showDate
                                        backFunction={() => dispatch(resetHistory())}
                                        link="/history"
                                        startButtonText="Perform again"
                                        menu={
                                            <HistoryMenu workout={workout} />

                                        }
                                    />
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
                                element={<LoginProtect>
                                    <Login />
                                </LoginProtect>}
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

                    {isAuthenticated && workoutStarted &&

                        <Drawer
                            sx={{
                                zIndex: 0,
                                width: { xs: 'none', md: 400, lg: 500 },
                                flexShrink: 0,
                                display: { xs: 'none', md: 'block' },
                                '& .MuiDrawer-paper': {
                                    width: { xs: 'none', md: 400, lg: 500 },
                                    boxSizing: 'border-box',
                                    bgcolor: 'transparent', //theme => theme.palette.action.hover,
                                    pointerEvents: 'none'
                                },
                            }}
                            variant="permanent"
                            anchor="right"
                        >
                        </Drawer>

                    }

                    {isAuthenticated && <BottomNavBar />}

                </Box>

        </LocalizationProvider>
    )
}

export default App
