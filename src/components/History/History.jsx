import { useDispatch, useSelector } from "react-redux"
import { startWorkout } from "../../redux/reducers/workoutReducer";

import { ListItemButton, Box, Stack } from "@mui/material";

import HideAppBar from "../AppBar/HideAppBar";
import HistoryToolbar from "./HistoryToolbar";
import { Link, useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import { useState } from "react";

import workoutService from '../../services/workouts'
import { addToHistory, setWorkouts } from "../../redux/reducers/historyReducer";
import HistoryListCard from "./HistoryListCard";


const History = () => {
    const workouts = useSelector(state => state.history)
    const user = useSelector(state => state.user)
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)
    const [showRemoveFilterButton, setShowRemoveFilterButton] = useState(false)
    const currentDate = new Date()
    //const [startDate, setStartDate] = useState(currentDate)
    //const [endDate, setEndDate] = useState(currentDate)

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
            
            <HideAppBar>
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
                        Start your first <Link to="/workout" onClick={handleClick} >workout!</Link> &#127947;
                    </Typography>
                </Box>
            }

            {/* {filteredWorkouts.map(workout =>
                //<ListItemButton >
                <HistoryListItem key={workout.id} workout={workout} />
                // </ListItemButton>

            )} */}

            <Stack
                spacing={2}
                padding={1.5}
                alignItems={'center'}
            >
                {filteredWorkouts.map(workout =>
                    <HistoryListCard key={workout.id} workout={workout} />
                )}
            </Stack>

        </>
    )
}


export default History