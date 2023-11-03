import { Link } from "react-router-dom";

import { Button, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container, Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { copyWorkout } from "../../redux/reducers/workoutReducer";
import { copySets } from "../../redux/reducers/setReducer";
import { copyExercises } from "../../redux/reducers/exerciseReducer";

import generateId from "../../utils/generateId";
import { formatDateTime } from "../../utils/Date";

const HistoryListItem = ({ workout }) => {
    const workoutState = useSelector(state => state.workout)
    const dispatch = useDispatch()

    const handleCopy = () => {
        dispatch(copyWorkout({ title: workout.title, exercises: workout.exercises }))
        dispatch(copyExercises(workout.exercises))
        // this is done bc in the workout object coming from the server, sets dont have a reference field of exerciseId
        let setsWithExerciseId = []
        workout.exercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                const setWithExerciseId = { ...set, exerciseId: exercise.id }
                setsWithExerciseId.push(setWithExerciseId)
            })
        })
        dispatch(copySets(setsWithExerciseId))
    }

    return (
        <Stack
            padding={1.5}
            spacing={0}
        >
            <Container sx={{ my: 0 }}>
                <Typography align='center' variant="h5" noWrap >
                    {formatDateTime(workout.createdAt)}
                </Typography>
            </Container>
            <Divider></Divider>

            <ListItemButton sx={{ minWidth: 1, overflow: "hidden", textOverflow: 'ellipsis', backgroundColor: "#d8e0ed" }} >
                <Stack spacing={2} sx={{ minWidth: 1, justifyContent: 'space-between', /* backgroundColor: "red" */ }}>
                    <Stack direction="row" sx={{ minWidth: 1, justifyContent: 'space-between' }} >
                        <Typography variant="h4" noWrap >
                            {workout.title}
                        </Typography>
                    </Stack>
                    <Stack spacing={3} /* sx={{backgroundColor: "green"}} */>
                        {workout.exercises.map((exercise, text, index) => (
                            <ListItem key={exercise.id} disablePadding sx={{ minWidth: 1,/*  backgroundColor: "yellow" */ }}>
                                <Stack sx={{/* backgroundColor: "green", */ width: 1 }}>
                                    <Typography variant="h6" noWrap >
                                        {exercise.exerciseInfo?.name || exercise.name}
                                    </Typography>
                                    <ListItemText primary={"warmup sets"} />
                                    <Stack direction='row' sx={{ flexWrap: 'wrap' }}>
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Grid container columnSpacing={2}  >
                                                {exercise.sets.map(set => {
                                                    /* const warmUpSetCount = exercise.sets.filter(set => {
                                                        set.warmup !== true
                                                    }).length
                                                    console.log("count ", warmUpSetCount);
                                                    if (warmUpSetCount === 0) {
                                                        return (
                                                            <Grid item sx={{ margin: 0, padding: 0 }}  >
                                                                <ListItemText
                                                                    key={exercise.id + generateId()}
                                                                    secondary={<>No warmup sets</>}
                                                                    sx={{ margin: 0, padding: 0 }}
                                                                />
                                                            </Grid>
                                                        )
                                                    } */
                                                    if (set.warmup === true) {

                                                        return (
                                                            <Grid item sx={{ margin: 0, padding: 0, /* backgroundColor: "red" */ }}  >
                                                                <ListItemText
                                                                    key={exercise.id + generateId()}
                                                                    secondary={<>{set.weight}kg x{set.reps}</>}
                                                                    sx={{ margin: 0, padding: 0, /* backgroundColor: "green" */ }}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                })}

                                            </Grid>
                                        </Box>
                                    </Stack>
                                    <ListItemText primary={"work sets"} />
                                    <Stack direction='row' spacing={0} sx={{ flexWrap: 'wrap' }}>
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Grid container columnSpacing={2}  >
                                                {exercise.sets.map(set => {
                                                    if (set.warmup === false) {
                                                        return (
                                                            <Grid item sx={{ margin: 0, padding: 0, /* backgroundColor: "red" */ }}  >
                                                                <ListItemText
                                                                    key={exercise.id + generateId()}
                                                                    secondary={<>{set.weight}kg x{set.reps}</>}
                                                                    sx={{ margin: 0, padding: 0, /* backgroundColor: "green" */ }}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                })}

                                            </Grid>
                                        </Box>

                                    </Stack>
                                </Stack>
                            </ListItem>
                        ))}
                    </Stack>
                    <Button component={Link} to='/workout'
                         variant="contained" onClick={handleCopy} >
                        Perform again
                    </Button>
                </Stack>
            </ListItemButton>

        </Stack>
    )
}

export default HistoryListItem