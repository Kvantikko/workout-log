import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'
import dayjs from 'dayjs'
import ExerciseForm from '../Forms/ExerciseForm'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { style } from './Helper'
import DateRangeForm from '../Forms/DateRangeForm'


const PickDateModal = () => {

    return (
        <>
            <DateRangeForm
                title={'Show history between a date range'}
            />
        </>
    )
}

export default PickDateModal