import { useState } from "react"

import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/userReducer"

import { useNavigate } from "react-router-dom"

import loginService from "../../services/login"
import workoutService from "../../services/workouts"
import userService from "../../services/user"

import {
    Typography,
    Link,
    Box,
    Button,
    FormLabel,
    TextField,
    Stack,
    InputAdornment,
    IconButton,
    Modal,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material"

import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { toast } from "react-toastify"
import { useSelector } from "react-redux"



import dayjs from 'dayjs'
import exerciseService from '../../services/exercises'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const DateRangeForm = ({ submitButton, title, filterFunction }) => {

    const user = useSelector(state => state.user)
    const userCreatedDate = new Date(user.createdAt).toISOString().split('T')[0]

    const currentDate = new Date().toISOString().split('T')[0]
    console.log("FORM ", currentDate)
    // const formattedDate = currentDate
    const [startDate, setStartDate] = useState(currentDate)
    const [endDate, setEndDate] = useState(currentDate)

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const onSubmit = async (event) => {
        event.preventDefault()

        /* console.log("Submitting...:");
        console.log("Form state start: ", startDate);
        console.log("Form state end: ", endDate); */

        filterFunction(startDate, endDate)
    }





    return (
        <form onSubmit={onSubmit}>
            <Typography variant="h5" textAlign={'center'} marginBottom={4}> {title} </Typography>
            <Stack
                spacing={1}
                //width={'max-content'}
                //minWidth="100vw"
                sx={{}}
            >
                <>
                    <Typography>Start date</Typography>
                    <DatePicker
                        //label={"Start date"}
                        defaultValue={dayjs(currentDate)}
                        onChange={(value) => {
                            const isoDateTime =
                                new Date(value.$d.getTime() - (value.$d.getTimezoneOffset() * 60000)).toISOString()

                            /* console.log("ISO DATE TIEM ", isoDateTime)
                            console.log("Startdate is chaning... ", value.$d);
                            console.log("Kaka ", isoDateTime);
                            console.log("Mutadet: ", isoDateTime.split('T')[0]); */

                            setStartDate(isoDateTime.split('T')[0])
                        }}
                    />
                    <Typography>End date</Typography>
                    <DatePicker
                        defaultValue={dayjs(currentDate)}
                        onChange={(value) => {
                            const isoDateTime =
                                new Date(value.$d.getTime() - (value.$d.getTimezoneOffset() * 60000)).toISOString()

                            /* console.log("ISO DATE TIEM ", isoDateTime)
                            console.log("Startdate is chaning... ", value.$d);
                            console.log("Kaka ", isoDateTime);
                            console.log("Mutadet: ", isoDateTime.split('T')[0]); */

                            setStartDate(isoDateTime.split('T')[0])
                        }}
                    />
                </>
            </Stack>
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ marginTop: 4 }}
            >
                <Stack direction={'row'} spacing={2}>
                    {submitButton ? submitButton : <div>Ok</div>}
                </Stack>
            </Button>
        </form>
    )
}

export default DateRangeForm