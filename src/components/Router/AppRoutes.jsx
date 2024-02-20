import { useEffect } from "react"

import { Routes, Route, useMatch, Navigate, useLocation } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'
import { expand, unExpand } from "../../redux/reducers/drawerReducer"
import { resetWorkoutPath, resetHistoryPath } from '../../redux/reducers/navReducer'

import { Typography } from "@mui/material"

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
import NotFound from "./NotFound"
import PageModal from "../Modals/PageModal"
import ExerciseList from "../Lists/ExerciseList"
import SearchInput from "../Inputs/SearchInput"
import EditWorkoutModal from "../Modals/EditWorkoutModal"
import WorkoutTemplateModal from "../Modals/WorkoutTemplateModal"
import { Layout } from "../../App"


const AppRoutes = () => {

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


    const location = useLocation()
    const previousLocation = location.state?.previousLocation

    console.log("location ", location)
    console.log("previous ", previousLocation)

    const dispatch = useDispatch()


    return (
        <React.Fragment>

            <Route path="/" element={<Layout />}
                location={previousLocation || location}
            >
                <Route index element={<Workout />} />
                <Route path="/templates/:id"
                    element={
                        <WorkoutDetails
                            workout={template}
                            backFunction={() => dispatch(resetWorkoutPath())}
                            link="/"
                            startButtonText="Start workout"
                            menu={
                                <TemplateMenu workout={template} />
                            }
                        />
                    }
                />
                <Route path="/history/:id"
                    element={
                        <WorkoutDetails
                            workout={workout}
                            showDate
                            backFunction={() => dispatch(resetHistoryPath())}
                            link="/history"
                            startButtonText="Perform again"
                            menu={
                                <HistoryMenu workout={workout} />
                            }
                        />
                    }
                />
                <Route path="/history" element={<History workouts={workouts} />} />
                <Route path="/exercises/:id" element={<Exercise exercise={exercise} />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/measure/:id" element={<Measurement measurement={measurement} />} />
                <Route path="/measure" element={<Measurements measurements={measurements} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<LoginProtect>   <Login /> </LoginProtect>} />
                <Route path="*" element={<h1>no match</h1>} />

                {previousLocation && (
                    <Route>
                        <Route
                            path="/workout-template"
                            element={
                                <WorkoutTemplateModal></WorkoutTemplateModal>



                            } />
                    </Route>
                )}

            </Route>
        </React.Fragment>
    )

    return (
        <>
            <Routes location={previousLocation || location} >
                <Route
                    path="/"
                    element={
                        <ProtectedRoute >
                            <Workout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/templates/:id"
                    element={
                        <ProtectedRoute>
                            <WorkoutDetails
                                workout={template}
                                backFunction={() => dispatch(resetWorkoutPath())}
                                link="/"
                                startButtonText="Start workout"
                                menu={
                                    <TemplateMenu workout={template} />
                                }
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history/:id"
                    element={
                        <ProtectedRoute>
                            <WorkoutDetails
                                workout={workout}
                                showDate
                                backFunction={() => dispatch(resetHistoryPath())}
                                link="/history"
                                startButtonText="Perform again"
                                menu={
                                    <HistoryMenu workout={workout} />
                                }
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History workouts={workouts} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/exercises/:id"
                    element={
                        <ProtectedRoute>
                            <Exercise exercise={exercise} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/exercises"
                    element={
                        <ProtectedRoute>
                            <Exercises />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/measure/:id"
                    element={
                        <ProtectedRoute>
                            <Measurement measurement={measurement} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/measure"
                    element={
                        <ProtectedRoute>
                            <Measurements measurements={measurements} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <LoginProtect>
                            <Login />
                        </LoginProtect>
                    }
                />
                <Route
                    path="*"
                    element={
                        <NotFound />
                    }
                />
            </Routes>

            {previousLocation && (
                <Routes>
                    <Route
                        path="/workout-template"
                        element={
                            <WorkoutTemplateModal></WorkoutTemplateModal>



                        } />
                </Routes>
            )}
        </>
    )
}

export default AppRoutes
