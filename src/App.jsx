import exerciseService from './services/exercises'
import workoutService from './services/workouts'
import templateService from "./services/templates"
import measurementService from "./services/measurements"

import { useEffect } from 'react'

import { Outlet, createBrowserRouter, Route, createRoutesFromElements, RouterProvider, useLocation, useMatch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setExercises } from './redux/reducers/exerciseLibraryReducer'
import { setWorkouts } from './redux/reducers/historyReducer'
import { setCredentials } from "./redux/reducers/userReducer"
import { setMeasurementValues, setMeasurements } from './redux/reducers/measurementsReducer'
import { setTemplates } from './redux/reducers/templateLibraryReducer'

import { Box } from '@mui/material'

import NavBar from './components/Navbar/Navbar'
import OngoingWorkoutBar from './components/AppBars/OngoingWorkoutBar'
import AppRoutes from './components/Router/AppRoutes'
import WorkoutDrawer from './components/Drawers/WorkoutDrawer'
import ProtectedRoute from './components/Router/ProtectedRoute'
import Home from './pages/Home'

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './ReactToastifyOverride.css'
import WorkoutDetails from './pages/WorkoutDetails'
import TemplateMenu from './components/Menus/TemplateMenu'
import HistoryMenu from './components/Menus/HistoryMenu'
import History from './pages/History'
import Exercise from './pages/Exercise'
import Exercises from './pages/Exercises'
import Measurement from './pages/Measurement'
import Measurements from './pages/Measurements'
import Profile from './pages/Profile'
import Login from './pages/Login'
import LoginProtect from './components/Router/LoginProtect'
import WorkoutTemplateModal from './components/Modals/WorkoutTemplateModal'
import Template from './pages/Template'
import CompletedWorkout from './pages/CompletedWorkout'
import AddExerciseToWorkoutModal from './components/Modals/AddExerciseToWorkoutModal'
import Workout from './components/Workout/Workout'
import CreateExerciseModal from './components/Modals/CreateExerciseModal'

export const Layout = () => {

    return (
        <div className="App">

            <Box sx={{ display: 'flex' }}  >
                <NavBar />
                <Box component="main" id='main' className='mainContent'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 2,
                        height: "100svh",
                        overflow: 'auto',
                        marginTop: { xs: 7, sm: 8 },
                        height: { xs: "84.8svh", sm: "83.8svh", md: "91.2svh" },
                        paddingBottom: 7
                    }}
                >
                    {/*   <AppRoutes /> */}
                    <Outlet />
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

const App = () => {

    //console.log("Rendering App")

    const user = useSelector(state => state.user)

    const isAuthenticated = user ? true : false

    const dispatch = useDispatch()

    /*  const location = useLocation()
     const previousLocation = location.state?.previousLocation */

    /* const templates = useSelector(state => state.templates)
    const matchTemplate = useMatch('/templates/:id')
    const template = matchTemplate
        ? templates.find(template => template.id === Number(matchTemplate.params.id))
        : null

    const exercises = useSelector(state => state.exerciseLibrary.exercises)
    const match = useMatch('/exercises/:id')
    const exercise = match
        ? exercises.find(exercise => exercise.id === Number(match.params.id))
        : null

    const workouts = useSelector(state => state.history)
    const matchHistory = useMatch('/history/:id')
    const workout = matchHistory
        ? workouts.find(workout => workout.id === Number(matchHistory.params.id))
        : null

    const measurements = useSelector(state => state.measurements.names)
    const matchMeasurement = useMatch('/measure/:id')
    const measurement = matchMeasurement
        ? measurements.find(measurement => measurement.id === Number(matchMeasurement.params.id))
        : null */

    let router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<ProtectedRoute> <Layout /> </ProtectedRoute>} >
                    <Route path="/" element={<Home />} >
                        <Route path="workout-template" element={<WorkoutTemplateModal />} >
                            <Route path="add-exercises" element={<AddExerciseToWorkoutModal />} />
                            <Route path="create-exercise" element={<CreateExerciseModal />} />
                        </Route>
                        <Route path="add-exercises" element={<AddExerciseToWorkoutModal />} />
                    </Route>
                    <Route path='/create-template' element={<Workout type={"template"} />} />
                    <Route path="/templates/:id" element={<Template />} />
                    <Route path="/history/:id" element={<CompletedWorkout />} />

                    <Route path="/history" element={<History />} >
                        <Route
                            path="workout-template"
                            element={
                                <WorkoutTemplateModal></WorkoutTemplateModal>

                            } />
                    </Route>
                    {/*   <Route path="/exercises/:id" element={<Exercise exercise={exercise} />} /> */}
                    <Route path="/exercises" element={<Exercises />} />
                    {/*   <Route path="/measure/:id" element={<Measurement measurement={measurement} />} /> */}
                    {/*   <Route path="/measure" element={<Measurements measurements={measurements} />} /> */}
                    <Route path="/profile" element={<Profile />} />

                    {/*    {previousLocation && (
                        <Route>
                            <Route
                                path="/workout-template"
                                element={
                                    <WorkoutTemplateModal></WorkoutTemplateModal>



                                } />
                        </Route>
                    )} */}
                    <Route path="*" element={<h1>no match</h1>} />
                </Route>

                <Route path="/login" element={<LoginProtect>   <Login /> </LoginProtect>} />
                <Route path="*" element={<h1>no match</h1>} />

                {/*   <Route>
                    <Route
                        path="/workout-template"
                        element={
                            <WorkoutTemplateModal></WorkoutTemplateModal>



                        } />
                </Route> */}
            </>
        )
    );

    useEffect(() => {
        if (isAuthenticated) {

            const date = new Date()

            templateService
                .getAllUserTemplates(user.email)
                .then((templates) => {
                    dispatch(setTemplates(templates))
                })
                .catch(error => {
                    toast.error(error.message)
                })

            workoutService
                .getByMonth(user.email, date.getMonth(), date.getFullYear())
                .then((workouts) => {
                    dispatch(setWorkouts(workouts))
                })
                .catch(error => {
                    toast.error(error.message)
                })

            exerciseService
                .getAll()
                .then((initialExercises) => {
                    dispatch(setExercises(initialExercises))
                })
                .catch(error => {
                    toast.error(error.message)
                })

            measurementService
                .getAllMeasurements()
                .then((measurements) => {
                    dispatch(setMeasurements(measurements))
                })
                .catch(error => {
                    toast.error(error.message)
                })

            measurementService
                .getAllMeasurementValues(user.email)
                .then((values) => {
                    dispatch(setMeasurementValues(values))
                })
                .catch(error => {
                    toast.error(error.message)
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
        <RouterProvider router={router} />

    )
}

export default App
