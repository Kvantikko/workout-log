import { useDispatch, useSelector } from "react-redux"
import { startWorkout } from "../../redux/reducers/workoutReducer";

import { ListItemButton, Box, Stack } from "@mui/material";

import HideAppBar from "../AppBar/HideAppBar";
import HistoryToolbar from "./HistoryToolbar";
import { Link, Navigate, useLocation, useNavigate, useNavigation } from "react-router-dom";

import { Typography } from "@mui/material";
import { useState } from "react";

import workoutService from '../../services/workouts'
import { addToHistory, setWorkouts } from "../../redux/reducers/historyReducer";
import HistoryCardList from "./HistoryCardList";




const History = ({ drawerWidth }) => {
    const workouts = useSelector(state => state.history)
    const user = useSelector(state => state.user)
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)
    const [showRemoveFilterButton, setShowRemoveFilterButton] = useState(false)

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
                dispatch(addToHistory(response))
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


    const handleClick = () => {
        dispatch(startWorkout())
    }


    return (
        <>

            {/*  {historyId && <Navigate to={`/history/${historyId}`} />} */}

            <HideAppBar drawerWidth={drawerWidth} >
                <HistoryToolbar
                    filter={filterByDate}
                    removeFilter={removeDateFilter}
                    showRemoveFilterButton={showRemoveFilterButton}
                    setShowRemoveFilterButton={setShowRemoveFilterButton}
                />
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

            <Box paddingY={2} paddingX={ {xs: 2, sm: 6, md: 10 } }>
                <HistoryCardList workouts={filteredWorkouts} showDate={true} />
            </Box>


        </>
    )
}


export default History