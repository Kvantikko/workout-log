import React, { useEffect, useState, useMemo } from "react"
import SetRow from "./SetRow"
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Slide, Typography, Collapse, IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"

import DeleteIcon from "@mui/icons-material/Delete"
import generateId from "../../utils/generateId"



import { deleteExercise, editExerciseNote, moveExerciseDown, moveExerciseUpp } from "../../redux/reducers/exerciseReducer"
import BasicModal from "../Modals/BasicModal"

import { forwardRef } from 'react';
import { addSetToTemplate, deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer";

const WorkoutExercise = forwardRef(({ exercise, arrayEnd, arrayStart, type }, ref) => {
    console.log("Rendering WorkoutExercise", exercise.name, arrayEnd)
    /**
     * VOISKO NOPEUTTAA JO ID ON INDEKSI NIIN EI TARVI ETSIÄ?
     */
    const noteFromState = type === "active" ? useSelector(state => state.exercises.find(e => e.id === exercise.id).note) : ''
    const [note, setNote] = (noteFromState ? noteFromState : '')       //!!!!!!!
    const [focused, setFocused] = useState(false)
    let allSetsFromState = []
    switch (type) {
        case "active":
            allSetsFromState = useSelector(state => state.sets)
            break;
        case "template":
            allSetsFromState = useSelector(state => state.template.sets)
            break;
        default:
            throw new Error('Component Workout must have a type prop specified!');
    }

    const sets = allSetsFromState.filter(set => set.exerciseId === exercise.id)     // !!!!!!!!!!!!!!!!!

    //const sets = React.useMemo(() => allSetsFromState.filter(set => set.exerciseId === exercise.id), [allSetsFromState])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const dispatch = useDispatch()

    /**
     * This hook prevents error "cannot update component while rendering a different component".
     * When use creates a new exercise, the default set of one is created and ActiveWorkout component cannot
     * update bc WorkoutExercise component is rendering the default set of one.
     */
    // REMEMEER: useEffect is executed after a render
    useEffect(() => {
        console.log('EFFECT WorkoutExercise');
        if (sets.length === 0) {
            console.log('WorkoutExercise: useEffect(): creating a set because sets.length is 0');
            createSet(true) // tää aiheuttaa sen että ei scrollaa pohjaan
            //window.scrollTo(0, document.body.scrollHeight)
            // window.scrollTo(0, document.body.scrollHeight, "smooth")


            /* setTimeout(() => {
              
                window.scrollTo({
                    top: document.body.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
            }, "100"); */

        }
    }, [])

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

    const createSet = (warmup) => {

        let weight = 20
        let reps = 15

        if (!(sets.length === 0)) {
            let lastSet = sets[sets.length - 1]
            weight = lastSet.weight
            reps = lastSet.reps
        }

        const newSet = {
            id: generateId(),
            exerciseId: exercise.id,
            createdAt: new Date().toJSON(), // tää servulla?
            warmup: warmup,
            weight: weight,
            reps: reps
        }

        switch (type) {
            case "active":
                dispatch(addSet(newSet))
                break
            case "template":
                dispatch(addSetToTemplate(newSet))
                break
            default:
                throw new Error('Component Workout must have a type prop specified!')
        }



        /* if (sets.length === 0) {
            console.log('WorkoutExercise: createSet(): sets length === 0...scrolling...');
            window.scrollTo(0, document.body.scrollHeight)
        } */
    }

    let setNumber = 0

    const renderSets = () => {
        //console.log('WorkoutExercise: renderSets() start');

        return (
            <Stack spacing={0}  >


                <TransitionGroup>
                    {sets.map((set, index) => {

                        if (!set.warmup) {
                            //console.log('this is NOT a warmup set');
                            setNumber = setNumber + 1
                        }
                        return (
                            <Collapse key={set.id}>
                                <SetRow key={set.id}
                                    set={set}
                                    number={set.warmup === true ? 0 : setNumber}
                                    index={index}
                                    type={type}
                                />
                            </Collapse>
                        )
                    })}
                </TransitionGroup>
            </Stack>
        )
    }

    const handleBlur = () => {
        setFocused(false)
        const changedExercise = { ...exercise, note: note }
        dispatch(editExerciseNote({ exerciseId: exercise.id, changedExercise: changedExercise }))
    }

    const handleSwapDown = () => {
        //setSlide((prev) => !prev)
        dispatch(moveExerciseDown(exercise.id))
        //setSlide((prev) => !prev)

    }

    const handleSwapUpp = () => {
        // setSlide((prev) => !prev)
        dispatch(moveExerciseUpp(exercise.id))
        //setSlide((prev) => !prev)

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

            {renderSets()}

            <Box textAlign='center' sx={{ mt: 2 }} > {/* box is for centering the button */}
                <Button
                    variant="text"
                    onClick={() => createSet(false)}
                    fullWidth
                >
                    Add set
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

        </Box>


    )
})

export default React.memo(WorkoutExercise)