
import WorkoutExercise from "./WorkoutExercise"
import { useState, useEffect, useCallback, memo } from "react"
import { useDispatch } from "react-redux"
import { Autocomplete, Button, TextField, Input, Stack, Container, Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import generateId from "../../utils/generateId"
import { addExercises, deleteExercise } from "../../redux/reducers/exerciseReducer"
import HideAppBar from "../AppBar/HideAppBar"
import WorkoutToolbar from "./WorkoutToolbar"
import FormModal from "../Modals/FormModal"
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from "../Modals/ConfirmationModal"
import ActiveWorkout from "./ActiveWorkout"


const Workout = ({ drawerWidth }) => {
    console.log("Rendering Workout");




    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <WorkoutToolbar />
            </HideAppBar>

            <Container disableGutters sx={{
                marginTop: { xs: 3, sm: 4, md: 6 },
                width: 0,
                minWidth: { xs: '100%', sm: '90%', md: '80%' },

            }}
            >
                <ActiveWorkout />
            </Container >
        </>
    )
}

export default Workout