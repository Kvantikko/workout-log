import workoutService from '../services/workouts'

import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { setHistoryPath } from "../redux/reducers/navReducer"
import { addWorkout, setWorkouts } from "../redux/reducers/historyReducer"

import { Link, Navigate, useLocation, useNavigate, useNavigation } from "react-router-dom"

import { ListItemButton, Box, Stack, Typography, CircularProgress, Grow } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import HideAppBar from "../components/AppBar/HideAppBar"
import WorkoutCardList from "../components/Lists/WorkoutCardList"
import BasicToolbar from "../components/Toolbars/BasicToolbar"
import { setDate } from '../redux/reducers/dateReducer'
import { formatToMonthAndYear } from '../utils/Date'

const History = ({ workouts }) => {

    const user = useSelector(state => state.user)
    const dateFromStore = useSelector(state => state.date)
    const date = dayjs(dateFromStore)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (workouts.length === 0) {
            workoutService
                .getByMonth(user.email, date.$M, date.$y)
                .then((response) => {
                    dispatch(setWorkouts(response))
                    setLoading(false)
                })
                .catch(error => {
                    toast.error(error.message)
                })
        }
    }, [dateFromStore])

    const handleCardClick = (event, workoutId) => {
        dispatch(setHistoryPath(`history/${workoutId}`))
        //navigate(`/history/${workoutId}`)  tätä ei toistaseksi tarvi ku kortti on linkki componentti
    }

    const handleOnDateChange = (event) => {
        dispatch(setWorkouts([]))
        dispatch(setDate(dayjs(event).toString()))
        setLoading(true)

    }

    return (
        <>
            <HideAppBar >
                <BasicToolbar title="History" >
                    <DatePicker
                        sx={{ width: { xs: 110, sm: 150 } }}
                        value={date}
                        views={['month']}
                        onChange={handleOnDateChange}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                    <DatePicker
                        sx={{ width: { xs: 70, sm: 150 } }}
                        value={date}
                        views={['year']}
                        onChange={handleOnDateChange}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                </BasicToolbar>
            </HideAppBar>

            {loading &&
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="75vh"
                    padding={4}
                >
                    <CircularProgress />
                </Box>
            }

            {workouts.length === 0 && (!loading) &&
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    minHeight="75vh"
                    padding={4}
                >
                    <Grow in={true}>
                        <Typography variant="h6" textAlign="center" >
                            You haven't completed any workouts in {`${formatToMonthAndYear(new Date(date))}`}
                        </Typography>
                    </Grow>
                </Box>
            }

            <Box paddingY={2} paddingX={{ xs: 2, sm: 6, md: 10 }}>
                <WorkoutCardList
                    workouts={workouts}
                    showDate={true}
                    onItemClick={handleCardClick}
                    path="history"
                />
            </Box>
        </>
    )
}


export default History