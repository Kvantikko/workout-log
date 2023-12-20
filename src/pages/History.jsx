import workoutService from '../services/workouts'

import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { pushHistory } from "../redux/reducers/navReducer"
import { addWorkout, setWorkouts } from "../redux/reducers/historyReducer"

import { Link, Navigate, useLocation, useNavigate, useNavigation } from "react-router-dom"

import { ListItemButton, Box, Stack, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from 'dayjs'

import HideAppBar from "../components/AppBar/HideAppBar"
import WorkoutCardList from "../components/Lists/WorkoutCardList"
import BasicToolbar from "../components/Toolbars/BasicToolbar"

const History = ({ drawerWidth }) => {
    const workouts = useSelector(state => state.history)
    const user = useSelector(state => state.user)
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)
    const [showRemoveFilterButton, setShowRemoveFilterButton] = useState(false)
    //const date = new Date()

    const [month, setMonth] = useState(new Date())
    const [year, setYear] = useState(new Date())

    console.log("DATE IIIIS");
    console.log(month);
    console.log(year);

    const location = useLocation();
    //const workoutId = location.pathname.split('/').pop();

    //console.log(workoutId);
    const navigate = useNavigate()

    const workoutId = useSelector(state => state.nav.history)

    const dispatch = useDispatch()

    const filterByDate = async (startDate, endDate) => {

        //console.log('workouts[length-1]', workouts[length]);

        const furthestWorkoutDateInStore =
            new Date(workouts[workouts.length - 1].createdAt).toISOString().split('T')[0]

        //console.log('furthestWorkoutDateInStore' ,furthestWorkoutDateInStore);

        if (startDate < furthestWorkoutDateInStore) { // endDate < furthestWorkoutDateInStore
            console.log("pitäs tehä database query");

            try {
                const response = await workoutService.getByDateRange(user.email, startDate, furthestWorkoutDateInStore)
                console.log("nyt haettiin daterangella servulta ", response);
                dispatch(addWorkout(response))
            } catch (err) {
                console.log(err);
            }

        }

        //console.log("Start: " , startDate)
        //console.log("End: ", endDate);

        const _filteredWorkouts = workouts.filter(workout => {
            //console.log("Filtering... ", new Date(workout.createdAt).toISOString().split('T')[0]  )
            const workoutDate = new Date(workout.createdAt).toISOString().split('T')[0]
            return workoutDate >= startDate && workoutDate <= endDate
        })

        //console.log("All workuts: ", workouts)

        //console.log("Filtered workouts ", _filteredWorkouts)

        setFilteredWorkouts(_filteredWorkouts)
        setShowRemoveFilterButton(true)
    }

    const removeDateFilter = () => {
        setFilteredWorkouts(workouts)
        setShowRemoveFilterButton(false)
    }

    const handleCardClick = (event, workoutId) => {
        dispatch(pushHistory(`history/${workoutId}`))
        //navigate(`/history/${workoutId}`)  tätä ei toistaseksi tarvi ku kortti on linkki componentti
    }

    return (
        <>

            {/*  {historyId && <Navigate to={`/history/${historyId}`} />} */}

            <HideAppBar drawerWidth={drawerWidth} >
                <BasicToolbar title="History" >
                    <DatePicker
                        sx={{ width: { xs: 110, sm: 150} }}
                        //onChange={(event) => console.log(event.$M)}
                        //value={month}
                        value={dayjs(month)}
                        views={['month']}
                        //onChange={(event) => setMonth(event.$M)}
                        slotProps={{ textField: { size: 'small' } }}

                    />
                    <DatePicker
                        sx={{ width: { xs: 70, sm: 150} }}
                        //onChange={(event) => console.log(event.$y)}
                        value={dayjs(year)}
                        //label={"year"}
                        views={['year']}
                        //onChange={(event) => setYear(event.$y)}
                        slotProps={{ textField: { size: 'small' } }}
                    />
                </BasicToolbar>
            </HideAppBar>

            {workouts.length === 0 &&
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    minHeight="75vh"
                    padding={4}

                >
                    <Typography variant="h6" textAlign="center" >
                        You haven't completed any workouts yet.
                    </Typography>
                </Box>
            }

            <Box paddingY={2} paddingX={{ xs: 2, sm: 6, md: 10 }}>
                <WorkoutCardList workouts={filteredWorkouts} showDate={true} onItemClick={handleCardClick} path="history" />
            </Box>


        </>
    )
}


export default History