import { useSelector } from "react-redux"

import HistoryListItem from "./HistoryListItem";

import { ListItemButton } from "@mui/material";

const History = () => {
    const workouts = useSelector(state => state.history)



    return (
        <div>
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