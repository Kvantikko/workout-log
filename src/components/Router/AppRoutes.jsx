import { Routes, Route, useMatch } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'
import { resetWorkoutPath, resetHistoryPath } from '../../redux/reducers/navReducer'

import Workout from '../../pages/Home'
import Exercises from '../../pages/Exercises'
import Exercise from '../../pages/Exercise'
import History from '../../pages/History'
import Profile from '../../pages/Profile'
import Login from '../../pages/Login'
import Measurements from '../../pages/Measurements'
import WorkoutDetails from '../../pages/WorkoutDetails'
import Measurement from '../../pages/Measurement'

import ProtectedRoute from './ProtectedRoute'
import LoginProtect from './LoginProtect'
import TemplateMenu from '../Menus/TemplateMenu'
import HistoryMenu from '../Menus/HistoryMenu'


const AppRoutes = ({ drawerWidth }) => {

    console.log("Rendering AppRouter.jsx");

    const templates = useSelector(state => state.templates)
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
        : null

    const dispatch = useDispatch()



    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute  >
                        <Workout drawerWidth={drawerWidth} />
                    </ProtectedRoute>}
            />
            <Route
                path="/templates/:id"
                element={
                    <ProtectedRoute>
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
                element={
                    <ProtectedRoute>
                        <WorkoutDetails
                            drawerWidth={drawerWidth}
                            workout={workout}
                            showDate
                            backFunction={() => dispatch(resetHistoryPath())}
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
                element={
                    <ProtectedRoute>
                        <History workouts={workouts} drawerWidth={drawerWidth} />
                    </ProtectedRoute>}
            />
            <Route
                path="/exercises/:id"
                element={
                    <ProtectedRoute>
                        <Exercise exercise={exercise} drawerWidth={drawerWidth} />
                    </ProtectedRoute>}
            />
            <Route
                path="/exercises"
                element={
                    <ProtectedRoute>
                        <Exercises drawerWidth={drawerWidth} />
                    </ProtectedRoute>}
            />
            <Route
                path="/measure/:id"
                element={
                    <ProtectedRoute>
                        <Measurement measurement={measurement} drawerWidth={drawerWidth} />
                    </ProtectedRoute>}
            />
            <Route
                path="/measure"
                element={
                    <ProtectedRoute>
                        <Measurements measurements={measurements} drawerWidth={drawerWidth} />
                    </ProtectedRoute>}
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile drawerWidth={drawerWidth} />
                    </ProtectedRoute>}
            />
            <Route
                path="/login"
                element={
                    <LoginProtect>
                        <Login />
                    </LoginProtect>}
            />
        </Routes>
    )
}

export default AppRoutes
