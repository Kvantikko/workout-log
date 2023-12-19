
import WorkoutExercise from "./WorkoutExercise"
import { useState, useEffect, useCallback, memo } from "react"
import { useDispatch } from "react-redux"
import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Typography } from "@mui/material"
import HideAppBar from "../AppBar/HideAppBar"
import WorkoutToolbar from "./WorkoutToolbar"
import AddIcon from '@mui/icons-material/Add';
import ActiveWorkout from "./Workout"


const WorkoutContainer = ({ drawerWidth }) => {
    console.log("Rendering Workout");




    return (
        <>
            {/* <HideAppBar drawerWidth={drawerWidth} >
                <WorkoutToolbar />
            </HideAppBar> */}

            <Container disableGutters sx={{
                marginTop: { xs: 3, sm: 4, md: 6 },
                width: 0,
                minWidth: { xs: '100%', sm: '90%', md: '80%' },

            }}
            >
                <ActiveWorkout type={"active"} />
            </Container >
        </>
    )
}

export default WorkoutContainer