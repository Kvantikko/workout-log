import { Link } from "react-router-dom";

import { Button, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container, Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { copyWorkout } from "../../redux/reducers/workoutReducer";
import { copySets } from "../../redux/reducers/setReducer";
import { copyExercises } from "../../redux/reducers/exerciseReducer";

import generateId from "../../utils/generateId";
import { formatDateTime } from "../../utils/Date";

import { useEffect, useState } from "react";
import { render } from "react-dom";

const HistoryListItem = ({ workout }) => {
    //const workoutState = useSelector(state => state.workout)
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
                                    <Grid item sx={{ margin: 0, padding: 0 }}  >
                                        <Stack direction={"row"} spacing={0.5}>
                                            <ListItemText primary={index+1 + ":"} />
                                            <ListItemText
                                                key={generateId()}
                                                secondary={<>{set.weight}kg x{set.reps}</>}
                                                sx={{ margin: 0, padding: 0, backgroundColor: "red", alignContent: "bottom", alignItems: "bottom" }}
                                            />
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

    const renderSets = () => {
        let warmups = []
        let works = []

        workout.exercises.forEach((exercise, text, index) => {
            exercise.sets.forEach((set) => {
                console.log(set);
                if (set.warmup === true) {
                    warmups.push(set)
                } else {
                    works.push(set)
                }
            })
        })

        return (
            <div>
                {renderArray("warmup sets", warmups)}
                {renderArray("work sets", works)}
            </div>
        )
    }

    return (
        <Stack padding={1.5} spacing={0}>
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

                                    {renderSets()}

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