import React, { useEffect, useState, useMemo } from "react"
import Sets from "./Sets";
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Slide, Typography, Collapse, IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux"
import { editTemplateExerciseNote, moveExerciseDownTemplate, moveExerciseUppTemplate } from "../../redux/reducers/templateReducer";

import DeleteIcon from "@mui/icons-material/Delete"
import generateId from "../../utils/generateId"

import BasicModal from "../Modals/BasicModal"
import NoteField from "../Inputs/NoteField"

import { forwardRef } from 'react';
import { addSetToTemplate, deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer";
import { deleteExerciseFromWorkout, editWorkoutExerciseNote, moveExerciseDownWorkout, moveExerciseUppWorkout } from "../../redux/reducers/workoutReducer";
import BasicMenu from "../Menus/BasicMenu";
import ExerciseMenu from "../Menus/ExerciseMenu";
import WorkoutExerciseMenu from "../Menus/WorkoutExerciseMenu";

const WorkoutExercise = forwardRef(({ exerciseId, arrayEnd, arrayStart, type }, ref) => {
    
    let exercise = {}
    switch (type) {
        case "active":
            exercise = useSelector(state => state.workout.exercises.byId[exerciseId])
            break
        case "template":
            exercise = useSelector(state => state.template.exercises.byId[exerciseId])
            break
        default:
            throw new Error('Component must have a type prop specified!')
    }

    const exerciseName = useSelector(state => state.exerciseLibrary.exercises.find(e => e.id === exercise?.exerciseId ))?.name

    //const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const dispatch = useDispatch()

    const removeExercise = () => {
        //setOpenDeleteModal(false)
        switch (type) {
            case "active":
                dispatch(deleteExerciseFromWorkout(exerciseId))
                break
            case "template":
                dispatch(deleteExerciseFromTemplate(exerciseId))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }
    }

    const handleSwapDown = () => {
        switch (type) {
            case "active":
                dispatch(moveExerciseDownWorkout(exercise.id))
                break
            case "template":
                dispatch(moveExerciseDownTemplate(exercise.id))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }
    }

    const handleSwapUpp = () => {
        switch (type) {
            case "active":
                dispatch(moveExerciseUppWorkout(exercise.id))
                break
            case "template":
                dispatch(moveExerciseUppTemplate(exercise.id))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }
    }


    const handleBlur = (note) => {
        const changedExercise = { ...exercise, note: note }
        switch (type) {
            case "active":
                dispatch(editWorkoutExerciseNote({ exerciseId: exercise.id, changedExercise: changedExercise }))
                break
            case "template":
                dispatch(editTemplateExerciseNote({ exerciseId: exercise.id, changedExercise: changedExercise }))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }

    }

    return (

        <Box ref={ref} sx={{ alignItems: 'center' }}>
            <Box paddingX={2}>
                <Stack direction={"row"} sx={{ justifyContent: "space-between" }} alignItems={'center'}>
                    {/*  <Button variant="text">{exercise?.name}</Button> */}
                    <Typography variant="h6">{exerciseName}</Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Stack paddingX={1}>
                            <IconButton
                                disabled={arrayStart ? true : false}
                                sx={{ padding: 0.5 }}
                                onClick={handleSwapUpp}
                            >
                                <ExpandLessIcon color={arrayStart ? 'disabled ' : 'info'} />
                            </IconButton>
                            <IconButton
                                disabled={arrayEnd ? true : false}
                                sx={{ padding: 0.5 }}
                                onClick={handleSwapDown}
                            >
                                <ExpandMoreIcon color={arrayEnd ? 'disabled ' : 'info'} />
                            </IconButton>
                        </Stack>
                        <WorkoutExerciseMenu
                            exercise={exercise}
                            handleDelete={removeExercise}
                        />
      
                    </Stack>

                </Stack>

                <NoteField note={exercise?.note} handleBlur={handleBlur} placeholder={"Exercise note"}></NoteField>



                <Stack direction={"row"} spacing={1} sx={{ justifyContent: "space-between", my: 1 }}>
                    <Box sx={{ maxWidth: 0.2, minWidth: 0.1 }} textAlign={'center'} >Set</Box>
                    <Box sx={{ width: 100, minWidth: 80 }} textAlign={'center'} >Kg</Box>
                    <Box sx={{ width: 100, minWidth: 40 }} textAlign={'center'} >Reps</Box>
                    <Box sx={{ minWidth: 0.1 }} textAlign={'center'} ></Box>
                    <Box sx={{ width: 0.07 }} textAlign={'center'} ></Box>
                </Stack>
            </Box>

            <Sets type={type} exerciseId={exerciseId} />

            <Divider sx={{ my: 3 }} />

        </Box>
    )
})

export default React.memo(WorkoutExercise)