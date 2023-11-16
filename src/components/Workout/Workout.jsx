import { Link } from "react-router-dom"
import ActiveWorkout from "./ActiveWorkout"
import { useEffect, useState } from "react"
import { Button, Stack, Divider, Container, Box, Modal, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { startWorkout } from "../../redux/reducers/workoutReducer"

import ModalRoot from "../Modals/ModalRoot"
import WorkoutToolbar from "./WorkoutToolbar"
import HideAppBar from "../AppBar/HideAppBar"


const Workout = ({ user }) => {
    console.log("Workout is rendering");
    //setPageIndex(1)
    const workoutStarted = useSelector(state => state.workout.workoutStarted)
    const dispatch = useDispatch()

    const handleScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
         //   console.log('handling scroll position ', scrollPosition);
            sessionStorage.removeItem("scrollPosition");
        }
    }

    // efekti ei vie täysin ikkunan pohjaan, koska luodaan yksi automaattinen seti sen jälkeen
    useEffect(() => {
        console.log("EFFECT SCROLL POSITION");
        handleScrollPosition()
    },[])

    return (
        <>
            <HideAppBar>
                <WorkoutToolbar />
            </HideAppBar>

            {!workoutStarted &&
                <Stack padding={3} spacing={2} alignItems="center">
                    <h2>Hello {user.firstname} &#128075;</h2>
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
                    //onClick={() => setPageIndex(1)}
                    >
                        Select from history
                    </Button>
                    <Divider orientation="horizontal" flexItem>
                        or
                    </Divider>
                    <Typography variant="h6" textAlign="center">
                        Select a saved template (Feature not implemented yet.)
                    </Typography>
                   
                   {/*  <Container padding={22}  >
                        <Box sx={{ mt: 5 }}>
                            <h4>
                                No templates saved yet.
                                You can save a template by starting a new workout.
                                (Feature not implemented yet.)
                            </h4>
                        </Box>
                    </Container> */}
                </Stack>
            }

            {workoutStarted && <ActiveWorkout style={{ padding: 10 }} />}
        </>
    )
}

export default Workout