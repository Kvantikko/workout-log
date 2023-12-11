import { ListItemText, Stack, Box, Grid, Typography } from "@mui/material"
import generateId from "../../utils/generateId"

const WorkoutExerciseSets = ({ workoutExerciseSets }) => {

    // console.log("WORKOUT EXERCISE SETS ", workoutExerciseSets);

    const renderArray = (title, setArray, color) => {
        if (setArray.length === 0) {
            return (
                <>
                    
                    <ListItemText primary={title} />
                    <ListItemText secondary={<>No sets</>}/>
                    {/* <Typography variant="body2" color={color}>
                        <>No reps</>
                    </Typography> */}
                </>

            )
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
                                            <Typography variant="body2" color={color}>
                                                <>{index + 1 + ":"}</>
                                            </Typography>
                                            {/*  <ListItemText secondary={index + 1 + ":"} /> */}
                                            <ListItemText >
                                                <Typography variant="body2" color="text.secondary">
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
            {renderArray("Warmup sets", warmups, "#ffba54")}
            {renderArray("Work sets", works, "#42a5f5")}
        </div>
    )
}

export default WorkoutExerciseSets