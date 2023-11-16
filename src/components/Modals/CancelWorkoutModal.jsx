import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearWorkout } from "../../redux/reducers/workoutReducer"

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { stopWatch } from '../../redux/reducers/stopWatchReducer'
import { clearSets } from '../../redux/reducers/setReducer'
import { clearExercises } from '../../redux/reducers/exerciseReducer'

const CancelWorkoutModal = ({ handleClose }) => {
    const dispatch = useDispatch()

    const handleClear = () => {
        dispatch(clearWorkout())
        dispatch(clearExercises())
        dispatch(clearSets())
        dispatch(stopWatch())
        handleClose()
    }

    return (
        <>
            <h3>
                Discard ongoing workout?
            </h3>
            <Stack direction='row'>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClear}>Yes</Button>
            </Stack>
        </>
    )
}

export default CancelWorkoutModal