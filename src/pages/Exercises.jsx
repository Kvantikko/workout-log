import { useState, useEffect, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setExercisesPath } from '../redux/reducers/navReducer'
import { setSearch } from '../redux/reducers/exerciseLibraryReducer'

import { IconButton, Box } from '@mui/material'
import { Add } from '@mui/icons-material'

import ExerciseList from '../components/Lists/ExerciseList'
import HideAppBar from '../components/AppBar/HideAppBar'
import ExercisesToolbar from '../components/Toolbars/ExercisesToolbar'
import BasicToolbar from '../components/Toolbars/BasicToolbar'


const Exercises = ({ drawerWidth }) => {

    //const [input, setInput] = useState(useSelector(state => state.exerciseLibrary.search.searchString))

    const navigate = useNavigate()
    const dispatch = useDispatch()

    /* useEffect(() => {
        dispatch(setSearch({ searchString: input, showFillWidth: true }))
    }, [input])
 */
    const handleListClick = useCallback((exercise) => {
        navigate(`/exercises/${exercise.id}`)
        dispatch(setExercisesPath(`exercises/${exercise.id}`))
    }, [])

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <ExercisesToolbar />
            </HideAppBar>
            <ExerciseList handleClick={handleListClick} />
        </>
    )
}

export default Exercises