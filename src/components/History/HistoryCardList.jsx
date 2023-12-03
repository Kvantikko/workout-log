import { Stack } from "@mui/material"
import HistoryCard from "./HistoryCard"
import { memo } from "react"

import Defer from "../Defer/Defer"

const HistoryCardList = ({ workouts }) => {



    return (
        <Stack
            spacing={2}
            padding={1.5}
            alignItems={'center'}
            
        >

            <Defer chunkSize={5}>
                {workouts.map(workout =>
                    <HistoryCard key={workout.id} workout={workout} />
                )}
            </Defer>
       {/*      {workouts.map(workout =>
                <HistoryCard key={workout.id} workout={workout} />
            )} */}
        </Stack>
    )
}

export default HistoryCardList