import { Stack } from "@mui/material"
import HistoryCard from "./HistoryCard"
import { memo } from "react"

const HistoryCardList = ({ workouts }) => {

    return (
        <Stack
            spacing={2}
            padding={1.5}
            alignItems={'center'}
        >
            {workouts.map(workout =>
                <HistoryCard key={workout.id} workout={workout} />
            )}
        </Stack>
    )
}

export default HistoryCardList