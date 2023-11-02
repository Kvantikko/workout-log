import { Link } from "react-router-dom"
import ActiveWorkout from "./ActiveWorkout"
import { useState } from "react"
import { Button, Stack, Divider, Container, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { startWorkout } from "../../redux/reducers/workoutReducer"


const Workout = ({ setPageIndex }) => {
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const dispatch = useDispatch()

    return (
        <>
            {!workoutStarted &&
                <Stack padding={3} spacing={2} alignItems="center">
                    <h2>Time to workout?</h2>
                    <Button
                        variant="contained"
                        onClick={() => dispatch(startWorkout())}
                        sx={{ maxWidth: 0.8 }} >
                        Start a new workout
                    </Button>
                    <Divider orientation="horizontal" flexItem>
                        or
                    </Divider>
                    <Button
                        variant="contained"
                        sx={{ maxWidth: 0.8 }}
                        component={Link} to='/history'
                        onClick={() => setPageIndex(1)}
                    >
                        Select from history
                    </Button>
                    <Divider orientation="horizontal" flexItem>
                        or
                    </Divider>
                    <h3>Select a saved template</h3>
                    <Container padding={22}  >
                        <Box sx={{ mt: 5 }}>
                            <h4>
                                No templates saved yet. 
                                You can save a template by starting a new workout.
                                (Feature not implemented yet.)
                            </h4>
                        </Box>
                    </Container>
                </Stack>
            }

            {workoutStarted && <ActiveWorkout style={{ padding: 10 }}/>}
        </>
    )
}

export default Workout