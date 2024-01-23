import exerciseService from './services/exercises'
import workoutService from './services/workouts'
import userService from "./services/user"
import templateService from "./services/templates"
import measurementService from "./services/measurements"

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { BrowserRouter as Router } from "react-router-dom"
//import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'
import { setExercises } from './redux/reducers/exerciseLibraryReducer'
import { setWorkouts } from './redux/reducers/historyReducer'
import { setCredentials } from "./redux/reducers/userReducer"
import { setMeasurementValues, setMeasurements } from './redux/reducers/measurementsReducer'
import { setTemplates } from './redux/reducers/templateLibraryReducer'

import { Box, Toolbar, useMediaQuery } from '@mui/material'

import BottomNavBar from './components/Navbar/BottomNavBar'
import LeftNavigationBar from './components/Navbar/PermanentDrawerLeft'
import OngoingWorkoutBar from './components/AppBar/OngoingWorkoutBar'
import ShiftLayoutLeftDrawer from './components/Drawers/ShiftLayoutLeftDrawer'
import AppRoutes from './components/Router/AppRoutes'
import WorkoutDrawer from './components/Drawers/WorkoutDrawer'

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './ReactToastifyOverride.css'



// '#1F1B24'
/*
* IMPORTANT!!!: gets heavy if more exercises, but its okay if one exercise with many sets!!!!!!!!!!!!!!!!!
*/

const App = () => {

    const user = useSelector(state => state.user)
    const isAuthenticated = user ? true : false
    const isWorkoutActive = useSelector(state => state.workout.workoutStarted)
    const isSmallScreen = useMediaQuery('(max-width:900px)')

    const dispatch = useDispatch()

    const drawerWidth = isWorkoutActive ?
        { xs: 0, sm: 0, md: 75, lg: 75, xl: 225 } :
        { xs: 0, sm: 0, md: 75, lg: 225 }

    useEffect(() => {
        if (isAuthenticated) {

            const date = new Date()

            workoutService
                .getByMonth(user.email, date.getMonth(), date.getFullYear())
                .then((workouts) => {
                    dispatch(setWorkouts(workouts))
                })
                .catch(error => {
                    console.log('error: ', error);
                })

            exerciseService
                .getAll()
                .then((initialExercises) => {
                    dispatch(setExercises(initialExercises))
                })
                .catch(error => {
                    console.log('error: ', error);
                })

            measurementService
                .getAllMeasurements()
                .then((measurements) => {
                    dispatch(setMeasurements(measurements))
                })
                .catch(error => {
                    console.log('error: ', error)
                })

            measurementService
                .getAllMeasurementValues(user.email)
                .then((values) => {
                    dispatch(setMeasurementValues(values))
                })
                .catch(error => {
                    console.log('error: ', error)
                })

            templateService
                .getAllUserTemplates(user.email)
                .then((templates) => {
                    dispatch(setTemplates(templates))
                })
                .catch(error => {
                    console.log('error: ', error);
                })
        }
    }, [isAuthenticated])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        const token = window.localStorage.getItem('userToken')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setCredentials({ user: user, token: token }))
            //navigate('/')
        }
    }, [])

    return (
        <div className="App">
            {isAuthenticated && isWorkoutActive && <WorkoutDrawer /> }
            {isAuthenticated && <Toolbar />}{/*for margin at the top*/}

            <Router>
                <Box id='mainContainer' className='mainContainer' sx={{ display: 'flex' }}  >
                    <LeftNavigationBar drawerWidth={drawerWidth} />
                    <Box component="main" id='main' className='scrollTest'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            height: !isAuthenticated ? "100svh" : { xs: "84.8svh", sm: "83.8svh", md: "91.2svh" },
                            overflow: 'auto',
                            paddingBottom: isAuthenticated ? 7 : 0
                        }}
                    >
                        <AppRoutes drawerWidth={drawerWidth} />
                    </Box>
                    <ShiftLayoutLeftDrawer />
                </Box>
                <BottomNavBar />
            </Router>

            <OngoingWorkoutBar />

            <ToastContainer
                className="toast-position"
                position="bottom-right"
                autoClose={3000}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={'dark'}
                toastStyle={{ backgroundColor: "#474747" }}
            />
        </div>
    )
}

export default App
