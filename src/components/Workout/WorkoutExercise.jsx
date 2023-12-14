import React, { useEffect, useState, useMemo } from "react"
import Sets from "./Sets";
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Slide, Typography, Collapse, IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"
import { moveExerciseDownTemplate, moveExerciseUppTemplate } from "../../redux/reducers/templateReducer";

import DeleteIcon from "@mui/icons-material/Delete"
import generateId from "../../utils/generateId"



import { deleteExercise, editExerciseNote, moveExerciseDown, moveExerciseUpp } from "../../redux/reducers/exerciseReducer"
import BasicModal from "../Modals/BasicModal"

import { forwardRef } from 'react';
import { addSetToTemplate, deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer";

const WorkoutExercise = forwardRef(({ exercise, arrayEnd, arrayStart, type }, ref) => {
    console.log("Rendering WorkoutExercise ", exercise.name)
    /**
     * VOISKO NOPEUTTAA JO ID ON INDEKSI NIIN EI TARVI ETSIÄ?
     */
    const noteFromState = type === "active" ? useSelector(state => state.exercises.find(e => e.id === exercise.id).note) : ''
    const [note, setNote] = (noteFromState ? noteFromState : '')       //!!!!!!!
    const [focused, setFocused] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const dispatch = useDispatch()

    const removeExercise = () => {
        switch (type) {
            case "active":
                dispatch(deleteExercise(exercise.id))
                break
            case "template":
                dispatch(deleteExerciseFromTemplate(exercise.id))
                break
            default:
                throw new Error('Component Workout must have a type prop specified!')
        }


    }

    const handleBlur = () => {
        setFocused(false)
        const changedExercise = { ...exercise, note: note }
        dispatch(editExerciseNote({ exerciseId: exercise.id, changedExercise: changedExercise }))
    }

    const handleSwapDown = () => {
        switch (type) {
            case "active":
                dispatch(moveExerciseDown(exercise.id))
                break
            case "template":
                dispatch(moveExerciseDownTemplate(exercise.id))
                break
            default:
                throw new Error('Component Workout must have a type prop specified!')
        }
        
    }

    const handleSwapUpp = () => {
        switch (type) {
            case "active":
                dispatch(moveExerciseUpp(exercise.id))
                break
            case "template":
                dispatch(moveExerciseUppTemplate(exercise.id))
                break
            default:
                throw new Error('Component Workout must have a type prop specified!')
        }
        
    }

    return (

        <Box ref={ref} sx={{ alignItems: 'center' }}>
            <Box paddingX={2}>
                <Stack direction={"row"} sx={{ justifyContent: "space-between" }} alignItems={'center'}>
                    <Typography variant="h6">{exercise.name}</Typography>
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
                        <IconButton
                            color="error"
                            onClick={() => setOpenDeleteModal(true)}
                            sx={{ height: 1 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                    {openDeleteModal &&
                        <BasicModal
                            open={openDeleteModal}
                            onClose={() => setOpenDeleteModal(false)}
                            title="Delete exercise?"
                            subTitle="This action cannot be undone."
                            confirmButtonText={'Delete'}
                            cancelButtonText={'Cancel'}
                            onSubmit={() => removeExercise()}
                        />
                    }
                </Stack>

                <TextField
                    variant="outlined" size="small"
                    fullWidth
                    placeholder="Exercise note"
                    //style={{ width: 100, minWidth: 80 }}
                    id="note"
                    type="text"
                    value={note}
                    autoComplete="off"
                    inputProps={{
                        sx: {
                            color: focused ?
                                theme => theme.palette.action.active :
                                theme => theme.palette.text.disabled
                        },
                    }}

                    onFocus={() => setFocused(true)}
                    onBlur={handleBlur}
                    onChange={(event) => setNote(event.target.value)}
                    sx={{
                        borderRadius: 2,
                        backgroundColor: theme => theme.palette.action.disabledBackground,
                        marginY: 1,
                        "& fieldset": { border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: 2 },
                    }}
                />

                <Stack direction={"row"} spacing={1} sx={{ justifyContent: "space-between", my: 1 }}>
                    <Box sx={{ maxWidth: 0.2, minWidth: 0.1 }} textAlign={'center'} >Set</Box>
                    <Box sx={{ width: 100, minWidth: 80 }} textAlign={'center'} >Kg</Box>
                    <Box sx={{ width: 100, minWidth: 40 }} textAlign={'center'} >Reps</Box>
                    <Box sx={{ minWidth: 0.1 }} textAlign={'center'} ></Box>
                    <Box sx={{ width: 0.07 }} textAlign={'center'} ></Box>
                </Stack>
            </Box>

            <Sets type={type} exercise={exercise} />

            <Divider sx={{ my: 3 }} />

        </Box>
    )
})

export default React.memo(WorkoutExercise)