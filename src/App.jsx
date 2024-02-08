import exerciseService from './services/exercises'
import workoutService from './services/workouts'
import templateService from "./services/templates"
import measurementService from "./services/measurements"

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setExercises } from './redux/reducers/exerciseLibraryReducer'
import { setWorkouts } from './redux/reducers/historyReducer'
import { setCredentials } from "./redux/reducers/userReducer"
import { setMeasurementValues, setMeasurements } from './redux/reducers/measurementsReducer'
import { setTemplates } from './redux/reducers/templateLibraryReducer'

import { Box } from '@mui/material'

import NavBar from './components/Navbar/Navbar'
import OngoingWorkoutBar from './components/AppBar/OngoingWorkoutBar'
import AppRoutes from './components/Router/AppRoutes'
import WorkoutDrawer from './components/Drawers/WorkoutDrawer'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './ReactToastifyOverride.css'

/*
* IMPORTANT!!!: gets heavy if more exercises, but its okay if one exercise with many sets!!!!!!!!!!!!!!!!!
*/

const App = () => {

    //console.log("Rendering App")

    const user = useSelector(state => state.user)

    const isAuthenticated = user ? true : false

    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuthenticated) {

            const date = new Date()

            templateService
                .getAllUserTemplates(user.email)
                .then((templates) => {
                    dispatch(setTemplates(templates))
                })
                .catch(error => {
                    console.log('error: ', error);
                })

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
        }
    }, [isAuthenticated])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        const token = window.localStorage.getItem('userToken')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setCredentials({ user: user, token: token }))
        }
    }, [])

    return (
        <div className="App">

            <Box sx={{ display: 'flex' }}  >
                <NavBar />
                <Box component="main" id='main' className='mainContent'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        height: "100svh",
                        marginTop: { xs: isAuthenticated ? 7 : 0, sm: isAuthenticated ? 8 : 0 },
                        height: !isAuthenticated ? "100svh" : { xs: "84.8svh", sm: "83.8svh", md: "91.2svh" },
                        overflow: 'auto',
                        paddingBottom: isAuthenticated ? 7 : 0,
                    }}
                >
                    <AppRoutes />
                </Box>
                <WorkoutDrawer />
            </Box>

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
