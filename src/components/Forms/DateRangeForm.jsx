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




import dayjs from 'dayjs'
import exerciseService from '../../services/exercises'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const DateRangeForm = ({ submitButton, title }) => {

    const currentDate = new Date()
    const [startDate, setStartDate] = useState(currentDate)
    const [endDate, setEndDate] = useState(currentDate)

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const onSubmit = async (event) => {
        event.preventDefault()

        const requestDate = () => {
            console.log("request date");
        }

        try {
            requestDate()
        } catch (err) {
            console.log(err);
        }

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
                        onChange={(value) => setStartDate(value.$d)}
                    />
                    <Typography>End date</Typography>
                    <DatePicker defaultValue={dayjs(currentDate)} onChange={(value) => setEndDate(value.$d)} />
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