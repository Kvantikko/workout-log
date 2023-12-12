import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'
import dayjs from 'dayjs'
import ExerciseForm from '../Forms/ExerciseForm'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import DateRangeForm from '../Forms/DateRangeForm'

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100wh',
    maxHeight: '100%',
    maxWidth: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
};




const PickDateModal = ({ confirmFunction }) => {

    return (
        <>
            <DateRangeForm
                title={'Show history between a date range'}
                filterFunction={confirmFunction}
            />
        </>
    )
}

export default PickDateModal