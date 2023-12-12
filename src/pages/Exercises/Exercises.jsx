import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilteredExercises from '../../components/Lists/FilteredExercises'

import HideAppBar from '../../components/AppBar/HideAppBar';


import ExercisesToolbar from '../../components/Toolbars/ExercisesToolbar';

import { useMatch, useNavigate } from 'react-router-dom';

import { setExercisesPath } from '../../redux/reducers/navReducer';

import { setSearchExercises } from '../../redux/reducers/searchReducer';



const Exercises = ({ drawerWidth }) => {
    const exercises = useSelector(state => state.exerciseLibrary)
    const exercisesFilteredSearch = useSelector(state => state.search.exercises)
    const searchState = useSelector(state => state.search)
    const [input, setInput] = useState(searchState.searchString)
    //console.log("EXERCISES LIBRARY ", exercises);
    const [visibleExercises, setVisibleExercises] =
        useState(
            ((exercisesFilteredSearch.length !== 0) ||
                (
                    (exercisesFilteredSearch.length === 0) &&
                    (input.length !== 0)
                )
            )
            ?
            exercisesFilteredSearch
            :
            exercises
        )
    const [open, setOpen] = useState(false)
   // const [selectedExercises, setSelectedExercises] = useState([])

   const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        let filteredExercises = exercises?.filter(
            e => e.name.toLowerCase().includes(input.toLowerCase())
        )
        setVisibleExercises(filteredExercises)
        dispatch(setSearchExercises(filteredExercises))
    }, [input, exercises])

    /* const match = useMatch('/exercises/:id')
    const note = match
        ? exercises.find(e => e.id === Number(match.params.id))
        : null */

    // button modaalille ja lista menu modaalille eri root?

    const handleListClick = (exercise) => {
        navigate(`/exercises/${exercise.id}`)
        dispatch(setExercisesPath(`exercises/${exercise.id}`))
    }

    return (
        <div>
            <HideAppBar drawerWidth={drawerWidth} >
                <ExercisesToolbar input={input} setInput={setInput} setOpen={setOpen} />
            </HideAppBar>
            <FilteredExercises exercises={visibleExercises} handleListClick={handleListClick} />
        </div>
    )
}

export default Exercises