import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilteredExercises from './FilteredExercises'
//import './Exercises.css'
import NewExerciseModal from './NewExerciseModal';
import DeleteExerciseModal from './DeleteExerciseModal';
import EditExerciseModal from './EditExerciseModal';


import { HideOnScroll } from '../Navbar/HideAppBar';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import zIndex from '@mui/material/styles/zIndex';




const Exercises = ({ input }) => {
    const exercises = useSelector(state => state.exerciseLibrary)
    const [visibleExercises, setVisibleExercises] = useState(exercises)

    useEffect(() => {
        let filteredExercises = exercises?.filter(
            e => e.name.toLowerCase().includes(input.toLowerCase())
        )
        setVisibleExercises(filteredExercises)
    }, [input, exercises])

    return (
        <>
            {console.log("rendering exercise component")}
            <DeleteExerciseModal />
            <EditExerciseModal />
            <FilteredExercises exercises={visibleExercises} />
        </>
    )
}

export default Exercises