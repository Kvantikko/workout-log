import { useDispatch, useSelector } from "react-redux"
import { startWorkout } from "../../redux/reducers/workoutReducer";

import HistoryListItem from "./HistoryListItem";

import { ListItemButton, Box } from "@mui/material";

import HideAppBar from "../AppBar/HideAppBar";
import HistoryToolbar from "./HistoryToolbar";
import { Link, useNavigate } from "react-router-dom";

const History = () => {
    const workouts = useSelector(state => state.history)
    const dispatch = useDispatch()
    //const navigate = useNavigate()

    const handleClick = () => {
        dispatch(startWorkout())
     
    }

    return (
        <>
            <HideAppBar>
                <HistoryToolbar />
            </HideAppBar>
            <Box
                display="flex"
                flexDirection="column"
                //justifyContent="center"
                alignItems="center"
                minHeight="75vh"
                //minWidth="75vh"
                padding={3}
            //maxWidth="75vw"
            //sx={{ maxWidth: 600 }}
            //minHeight="75vh"
            >
                {workouts.length === 0 &&
                    <h3>You haven't completed any workouts yet.
                        Start your first <Link to="/workout" onClick={handleClick} >workout!</Link>
                    </h3>
                }
                {workouts.map(workout =>
                    //<ListItemButton >
                    <HistoryListItem key={workout.id} workout={workout} />
                    // </ListItemButton>

                )}
            </Box>
        </>
    )
}


export default History