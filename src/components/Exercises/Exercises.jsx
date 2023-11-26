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

import ModalRoot from '../Modals/ModalRoot';

import ExercisesToolbar from './ExercisesToolbar';

import { useMatch } from 'react-router-dom';



const Exercises = ({ drawerWidth }) => {
    const exercises = useSelector(state => state.exerciseLibrary)
    //console.log("EXERCISES LIBRARY ", exercises);
    const [visibleExercises, setVisibleExercises] = useState(exercises)
    const [input, setInput] = useState('')
    const [open, setOpen] = useState(false)
    

    useEffect(() => {
        let filteredExercises = exercises?.filter(
            e => e.name.toLowerCase().includes(input.toLowerCase())
        )
        setVisibleExercises(filteredExercises)
    }, [input, exercises])

    /* const match = useMatch('/exercises/:id')
    const note = match
        ? exercises.find(e => e.id === Number(match.params.id))
        : null */

    // button modaalille ja lista menu modaalille eri root?
    return (
        <div>
            <ModalRoot open={open} setOpen={setOpen} modalType={"createExercise"} />
            <HideAppBar drawerWidth={drawerWidth} >
                <ExercisesToolbar input={input} setInput={setInput} setOpen={setOpen}/>
            </HideAppBar>
            <FilteredExercises exercises={visibleExercises} />
        </div>
    )
}

export default Exercises