import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'
import dayjs from 'dayjs'
import ExerciseForm from './ExerciseForm'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { style } from './Helper'


const ConfirmCopyModal = ({ handleClose, copyFunction }) => {
    return (
        <>
            <h2>Workout in progress</h2>
            <h4>
                You have a workout in progress,
                are you sure you want to override the current workout?
            </h4>

            <Stack direction={"row"} alignContent={"center"}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={copyFunction}>Yes</Button>
            </Stack>
        </>
    )
}

export default ConfirmCopyModal