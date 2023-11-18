import exerciseService from './services/exercises'
import workoutService from './services/workouts'

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
import Register from './components/Register/Register'

import StopWatch from './components/Clock/StopWatch'

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
//import './ReactToastify.css'

import BottomNavBar from './components/Navbar/BottomNavBar'
import HideAppBar from './components/AppBar/HideAppBar'

import { setUser } from "./redux/reducers/userReducer"
import Measurements from './components/Measurements/Measurements';



//import { pageRoutes } from "../utils/routes";

/* vois kyllä tehddä modalin jossa on nappi ja ei haittaa että menu jää taustalle

 */










const App = () => {
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)
    const user = useSelector(state => state.user)
    const authenticated = !(Object.keys(useSelector(state => state.user)).length === 0) // is user obj empty?
    const navigate = useNavigate()

    console.log("Rendering App.jsx ", authenticated);
    console.log("Rendering App.jsxakaka ", user);

    const dispatch = useDispatch() // react-redux | tätä funktiota käytetään actionien dispatchaamiseen

    const [pageIndex, setPageIndex] = useState(0)
    // const [value, setValue] = React.useState(0);
    const [searchInput, setSearchInput] = useState('')




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
                    console.log("EFFECT workouts response: ", workouts);
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
        const token = window.localStorage.getItem('userToken')
        console.log("TOken FROM LOC STORage ", token);
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log("TRUE, parsed user: ", user);
            dispatch(setUser(user))
            exerciseService.setToken(token)
            workoutService.setToken(token)
            //Service.setToken(token)
            navigate('/')

        }
    }, [])



    const exercises = useSelector(state => state.exerciseLibrary)
    //console.log("täsä nää exercises ", exercises)

    const match = useMatch('/exercises/:id')
    //console.log("MATCH APP.JSX ", match);
    const exercise = match
        ? exercises.find(exercise => exercise.id === Number(match.params.id))
        : null
    //console.log("no lötyylö? ", exercise);

    const margin = () => {
        if (!stopWatchIsActive) {
            return 70
        } else {
            return 180
        }
    }

    const ProtectedRoute = ({ children }) => {
        //const location = useLocation();
        //const authenticated = useSelector((state) => state.auth.authenticated)

        if (!authenticated) {
            console.log("NOT AUTHENTICATED");
            return <Navigate to="/login" />
        }

        return children;
    };

    const notify = () => toast("This is a toast notification !");

    return (
        <div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <HideAppBar sx={{ padding: 200 }}>
                    {workoutStarted && stopWatchIsActive &&
                        <StopWatch></StopWatch>
                    }
                </HideAppBar> */}
                    <div style={{ marginTop: margin() }}>
                        <Routes>
                            <Route
                                path="/workout"
                                element={<ProtectedRoute>
                                    <Workout user={user} style={{ margin: '110' }} />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/history"
                                element={<ProtectedRoute>
                                    <History />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/exercises/:id"
                                element={<ProtectedRoute>
                                    <Exercise exercise={exercise} />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/exercises"
                                element={<ProtectedRoute>
                                    <Exercises />
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/measure"
                                element={<ProtectedRoute>
                                    <Measurements></Measurements>
                                </ProtectedRoute>}
                            />
                            <Route
                                path="/profile"
                                element={<ProtectedRoute>
                                    <Profile user={user} />
                                </ProtectedRoute>} />
                            <Route
                                path="/"
                                element={<ProtectedRoute>
                                    <Navigate to="/workout" />
                                </ProtectedRoute>}
                            />

                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                    {authenticated && <BottomNavBar />}
                </LocalizationProvider>
            </div>
            {/* <ToastContainer /> */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default App
