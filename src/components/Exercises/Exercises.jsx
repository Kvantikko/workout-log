import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilteredExercises from './FilteredExercises'

import HideAppBar from '../AppBar/HideAppBar';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import zIndex from '@mui/material/styles/zIndex';

import ExercisesToolbar from './ExercisesToolbar';



const Exercises = () => {
    const exercises = useSelector(state => state.exerciseLibrary)
    const [visibleExercises, setVisibleExercises] = useState(exercises)
    const [input, setInput] = useState('')
    

    useEffect(() => {
        let filteredExercises = exercises?.filter(
            e => e.name.toLowerCase().includes(input.toLowerCase())
        )
        setVisibleExercises(filteredExercises)
    }, [input, exercises])

    return (
        <div>
            <HideAppBar>
                <ExercisesToolbar setInput={setInput} />
            </HideAppBar>
            {console.log("rendering exercise component")}
            <FilteredExercises exercises={visibleExercises} />
        </div>
    )
}

export default Exercises