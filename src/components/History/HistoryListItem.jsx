import { Link } from "react-router-dom";

import { Button, Divider, Stack, Typography, List, ListItem, ListItemButton, ListItemText, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { copyWorkout } from "../../redux/reducers/workoutReducer";
import { copySets } from "../../redux/reducers/setReducer";



import generateId from "../../utils/generateId";

const HistoryListItem = ({ workout }) => {
    const workoutState = useSelector(state => state.workout)
    const dispatch = useDispatch()



    const handleCopy = () => {
        console.log("handling copy of: ", workout)
        console.log("workout state: ", workoutState)
        dispatch(copyWorkout({ title: workout.title, exercises: workout.exercises }))

        // this is done bc in the workout object coming from the server, sets dont have a reference field of exerciseId
        let setsWithExerciseId = []
        workout.exercises.forEach(exercise => {
            exercise.sets.forEach(set => {
                const setWithExerciseId = { ...set, exerciseId: exercise.id }
                setsWithExerciseId.push(setWithExerciseId)
            })
        })



        console.log("SETS ", setsWithExerciseId);

        dispatch(copySets(setsWithExerciseId))
        console.log("workout state again: ", workoutState)

    }

    return (

        <Stack
            // direction='row'
            padding={0.5}
            spacing={0}
        //sx={{ overflow: "hidden", textOverflow: 'ellipsis', width: '1', justifyContent: 'space-between' }}
        >

            <Container>
                <Typography align='center' variant="h6" noWrap >
                    {workout.createdAt}
                </Typography>
            </Container>
            <Divider></Divider>

            <ListItemButton sx={{ maxWidth: "1", overflow: "hidden", textOverflow: 'ellipsis' }} >
                <Stack >
                    <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between' }} >
                        <Typography variant="h6" noWrap >
                            {workout.title}
                        </Typography>
                        <Button variant="contained" onClick={handleCopy} >
                            Copy
                        </Button>
                    </Stack>
                    <List>
                        {workout.exercises.map((exercise, text, index) => (
                            <ListItem key={exercise.id} disablePadding >
                                <Stack>
                                    <ListItemText primary={exercise.exerciseInfo?.name || exercise.name} />
                                    <Stack direction='row' spacing={1}>
                                        <ListItemText secondary={"warm:"} />
                                        {exercise.sets.map(set => {
                                            if (set.warmup === true) {
                                                return <ListItemText key={exercise.id + generateId()} secondary={<>{set.weight}x{set.reps}</>} />
                                            }
                                        })}
                                    </Stack>
                                    <Stack direction='row' spacing={1} sx={{ maxWidth: '100vw', overflow: "hidden", flexWrap: 'wrap' }}>
                                        <ListItemText secondary={"work:"} sx={{ maxWidth: '100vw', overflow: "hidden", flexWrap: 'wrap' }} />
                                        {exercise.sets.map(set => {
                                            if (set.warmup === false) {
                                                return <ListItemText key={exercise.id + generateId()} secondary={<>{set.weight}x{set.reps} </>} />
                                            }
                                        })}
                                    </Stack>
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </ListItemButton>

        </Stack>
    )
}

export default HistoryListItem