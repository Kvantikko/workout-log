import exerciseService from './services/exercises'

import { setExercises } from './redux/reducers/exerciseLibraryReducer'
import { setWorkouts } from './redux/reducers/historyReducer'

import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Workout from './components/Workout/Workout'
/* import Home from './components/Timeline/Timeline'
import Login from './components/Profile/Login'
import Users from './components/Users' */

import Exercises from './components/Exercises/Exercises'
import Exercise from './components/Exercises/Exercise'
import History from './components/History/History'
import Login from './components/Profile/Login'
import ActiveWorkout from './components/Workout/ActiveWorkout'
import Profile from './components/Profile/Profile'

import Fab from '@mui/material/Fab'
import MenuIcon from '@mui/icons-material/Menu'

import TemporaryDrawer from './components/Navbar/TemporaryDrawer'

import StopWatch from './components/Clock/StopWatch'

import {
    Routes,
    Route,
    Navigate,
    useMatch
} from "react-router-dom"

import axios from 'axios'

import BottomNavBar from './components/Navbar/BottomNavBar'
import HideAppBar from './components/AppBar/HideAppBar'



const App = () => {
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const stopWatchIsActive = useSelector(state => state.stopWatch.isActive)

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

        // axios.get palauttaa promise olion
        // Takaisinkutsun rekisteröinti tapahtuu antamalla promisen then-metodille käsittelijäfunktio (response)... ymmärsinlö oikein
        axios
            .get('http://localhost:8080/api/v1/workouts')
            .then((response) => {
                const workouts = response.data
                dispatch(setWorkouts(workouts))
            })
    }, [])

    useEffect(() => {
        exerciseService
            .getAll()
            .then((initialExercises) => {
                dispatch(setExercises(initialExercises)) // redux storeen
            })
            .catch(error => {
                alert("tapahtui virhe hakiessa kaikkia liikkeitä")
                console.log('error: ', error);
            })
    }, [])

    const margin = () => {
        if (!stopWatchIsActive) {
            return 80
        } else {
            return 180
        }
    }

    return (
        <div>
            <div>
                {/* <HideAppBar sx={{ padding: 200 }}>
                    {workoutStarted && stopWatchIsActive &&
                        <StopWatch></StopWatch>
                    }
                </HideAppBar> */}
                <div style={{ marginTop: margin() }}>
                    <Routes className='routes'>
                        {/*  <Route path="/" element={<Workout />} /> */}
                        <Route path="/workout" element={<Workout setPageIndex={setPageIndex} />} />
                        <Route path="/history" element={<History setPageIndex={setPageIndex} />} />
                        {/*    <Route path="/workout/active" element={<Workout />} /> */}
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/exercises/:id" element={<Exercise />} />
                        <Route path="/measure" element={<div> tänne mittaukset </div>} />
                        <Route path="/profile" element={<Profile />} />
                        {/*  <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/" element={<Home />} /> */}
                    </Routes>
                </div>
                <BottomNavBar/>
            </div>
        </div>
    )
}

export default App
