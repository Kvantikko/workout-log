import { Stack, Box, Grid, Container } from "@mui/material"
import WorkoutCard from "../Cards/WorkoutCard"
import { memo } from "react"

import Defer from "../Defer/Defer"

const WorkoutCardList = ({ workouts, showDate, onItemClick, path }) => {



    return (
            <Stack
                //spacing={2}
                //padding={1.5}
               // alignItems={'center'}
                width={"100%"}
                direction={'row'}
                flexWrap={'wrap'}
                gap={2}
                flexGrow={2}
                //justifyContent={'center'}
                //alignContent={'flex-start'}
            >
                <Defer chunkSize={5}>
                    {workouts.map(workout =>
                        <Box key={workout.id} width={290} flexGrow={1} alignContent={'center'}>
                            <WorkoutCard workout={workout} showDate={showDate} onClickFunction={onItemClick} path={path}/>
                        </Box>

                    )}
                </Defer>
            </Stack>
    )
}

export default WorkoutCardList