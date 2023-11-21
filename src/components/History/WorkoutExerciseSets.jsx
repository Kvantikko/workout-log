import { ListItemText, Stack, Box, Grid, Typography } from "@mui/material"
import generateId from "../../utils/generateId"

const WorkoutExerciseSets = ({ workoutExerciseSets }) => {

   // console.log("WORKOUT EXERCISE SETS ", workoutExerciseSets);

    const renderArray = (title, setArray) => {
        if (setArray.length === 0) {
            return <ListItemText secondary={<>No reps</>} />
        }
        return (
            <div>
                <ListItemText primary={title} />
                <Stack direction='row' sx={{ flexWrap: 'wrap' }}>
                    <Box sx={{ flexGrow: 0 }}>
                        <Grid container columnSpacing={2}  >
                            {setArray.map((set, index) => {
                                return (
                                    <Grid key={generateId()} item sx={{ margin: 0, padding: 0 }}  >
                                        <Stack direction={"row"} spacing={0.5} >
                                            <ListItemText primary={index + 1 + ":"} />
                                            <ListItemText >
                                                <Typography variant="body1" color="textSecondary">
                                                    <>{set.weight}kg x{set.reps}</>
                                                </Typography>
                                            </ListItemText>
                                        </Stack>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Stack>
            </div>
        )
    }

    let warmups = []
    let works = []

    workoutExerciseSets.forEach((set) => {
        if (set.warmup === true) {
            warmups.push(set)
        } else {
            works.push(set)
        }
    })


    return (
        <div>
            {renderArray("warmup sets", warmups)}
            {renderArray("work sets", works)}
        </div>
    )
}

export default WorkoutExerciseSets