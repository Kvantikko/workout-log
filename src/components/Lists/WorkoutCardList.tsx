import React from 'react'

import { Stack, Box } from "@mui/material"

import WorkoutCard from "../Cards/WorkoutCard"
import Defer from "../Defer/Defer"

interface Workout {
    id: string;
    // define rest...
}

interface WorkoutCardListProps {
    workouts: Workout[];
    showDate: boolean;
    onItemClick: (id: string) => void;
    path: string;
}

/**
 * adapts to screen size: on mobile it's a list, on desktop it's a grid
 */

const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ workouts, showDate, onItemClick, path }) => {

    return (
        <Stack
            width={"100%"}
            direction={'row'}
            flexWrap={'wrap'}
            gap={2}
            flexGrow={2}
        >
            <Defer chunkSize={8} isFlip={false}>
                {workouts.map(workout =>
                    <Box key={workout.id} width={290} flexGrow={1} alignContent={'center'}>
                        <WorkoutCard workout={workout} showDate={showDate} onClickFunction={onItemClick} path={path} />
                    </Box>
                )}
            </Defer>
        </Stack>
    )
}

export default WorkoutCardList