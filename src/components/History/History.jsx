import { useSelector } from "react-redux"

import HistoryListItem from "./HistoryListItem";

import { ListItemButton } from "@mui/material";

import HideAppBar from "../AppBar/HideAppBar";
import HistoryToolbar from "./HistoryToolbar";

const History = () => {
    const workouts = useSelector(state => state.history)

    return (
        <div>
           <HideAppBar>
                <HistoryToolbar  />
            </HideAppBar>
            {workouts.length === 0 && <h2>Nothing here yet!</h2>}
            {workouts.map(workout =>
                //<ListItemButton >
                    <HistoryListItem key={workout.id} workout={workout} />
               // </ListItemButton>

            )}
        </div>
    )
}


export default History