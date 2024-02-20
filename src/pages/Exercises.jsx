import { useState, useEffect, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setExercisesPath } from '../redux/reducers/navReducer'
import { setSearch } from '../redux/reducers/exerciseLibraryReducer'

import { IconButton, Box } from '@mui/material'
import { Add } from '@mui/icons-material'

import ExerciseList from '../components/Lists/ExerciseList'
import HideAppBar from '../components/AppBars/HideAppBar'
import ExercisesToolbar from '../components/Toolbars/ExercisesToolbar'

const Exercises = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleListClick = useCallback((exercise) => {
        navigate(`/exercises/${exercise.id}`)
        dispatch(setExercisesPath(`exercises/${exercise.id}`))
    }, [])

    return (
        <Box paddingBottom={2}>
            <HideAppBar >
                <ExercisesToolbar />
            </HideAppBar>
            <ExerciseList handleClick={handleListClick} />
        </Box>
    )
}

export default Exercises