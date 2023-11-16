import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise } from '../../redux/reducers/exerciseLibraryReducer'
import dayjs from 'dayjs'
import ExerciseForm from './ExerciseForm'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { style } from './Helper'


const PickDateModal = ({ handleClose }) => {
    const currentDate = new Date()
    const [startDate, setStartDate] = useState(currentDate)
    const [endDate, setEndDate] = useState(currentDate)

    const dispatch = useDispatch()




    //console.log(currentDate.getDate());
    console.log(startDate);
    console.log(endDate);

    const requestDate = () => {

        console.log("request date");
        handleClose()
    }

    return (
        <>
            <h2>Show workout history between a date range</h2>
            <h4>Start date</h4>
            <DatePicker label={"Start date"} defaultValue={dayjs(currentDate)} onChange={(value) => setStartDate(value.$d)} />
            <h4>End date</h4>
            <DatePicker defaultValue={dayjs(currentDate)} onChange={(value) => setEndDate(value.$d)} />
            <Stack direction={"row"} alignContent={"center"}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={requestDate}>Ok</Button>
            </Stack>
        </>
    )
}

export default PickDateModal