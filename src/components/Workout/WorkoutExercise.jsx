import React, { useEffect, useState, useMemo } from "react"
import Set from "./SetRow"
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Typography, Collapse } from "@mui/material"
import { TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"

import DeleteIcon from "@mui/icons-material/Delete"
import generateId from "../../utils/generateId"

import { deleteExercise, editExerciseNote } from "../../redux/reducers/exerciseReducer"
import DeleteExerciseFromWorkoutModal from "../Modals/DeleteExerciseFromWorkoutModal"

const WorkoutExercise = ({ exercise }) => { // deleteExercise
    console.log("Rendering WorkoutExercise", exercise.name);
    /**
     * VOISKO NOPEUTTAA JO ID ON INDEKSI NIIN EI TARVI ETSIÄ?
     */
    const noteFromState =  useSelector(state => state.exercises.find(e => e.id === exercise.id).note)
    const [note, setNote] = (noteFromState ? noteFromState : '')       //!!!!!!!
    const [focused, setFocused] = useState(false)
    const allSetsFromState = useSelector(state => state.sets) // filter funktio aiheuttaa varootuksen
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

    const removeExercise = () => dispatch(deleteExercise(exercise.id))

    const createSet = (warmup) => {
        //console.log('WorkoutExercise: createSet() start');

        // default values for input
        let weight = 20
        let reps = 15
        // console.log('WorkoutExercise: const sets.length === 0: ', sets.length === 0);
        // console.log('WorkoutExercise: const isSetsLengthZero: ', isSetsLengthZero);
        // copying last done set values 
        if (!(sets.length === 0)) {
            let lastSet = sets[sets.length - 1]
            //console.log("all sets ", sets);
            //console.log("last set ", lastSet);
            weight = lastSet.weight
            reps = lastSet.reps
        }

        //console.log("if over ");
        //console.log("weight: ", weight);
        //console.log("reps ", reps);

        const newSet = {
            id: generateId(),
            exerciseId: exercise.id,
            createdAt: new Date().toJSON(), // tää servulla?
            warmup: warmup,
            weight: weight,
            reps: reps
        }

        //console.log("This is the new set: ", newSet, " dispatching...");

        dispatch(addSet(newSet))

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
                    {sets.map((set, index) => (
                        <Collapse key={set.id}>
                            <Set key={set.id}
                                set={set}
                                number={set.warmup === true ? 0 : setNumber}
                                index={index}
                            />
                        </Collapse>
                    ))}
                </TransitionGroup>


               {/*  {sets.map((set, index) => {
                    //console.log('mapping set:', set);
                    if (!set.warmup) {
                        //console.log('this is NOT a warmup set');
                        setNumber = setNumber + 1
                    }
                    return (
                        <Set key={set.id}
                            set={set}
                            number={set.warmup === true ? 0 : setNumber}
                            index={index}
                        />
                    )
                })} */}


            </Stack>
        )
    }

    const handleBlur = () => {
        console.log("handling blur");
        setFocused(false)
        const changedExercise = { ...exercise, note: note }
        dispatch(editExerciseNote({ exerciseId: exercise.id, changedExercise: changedExercise }))
    }

    return (

        <Box sx={{ alignItems: 'center' }}>
            <Box paddingX={2}>
                <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">{exercise.name}</Typography>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenDeleteModal(true)}
                        sx={{ marginBottom: 1 }}
                    >
                        <DeleteIcon />
                    </Button>
                    <DeleteExerciseFromWorkoutModal
                        open={openDeleteModal}
                        onClose={setOpenDeleteModal}
                        confirmFunction={removeExercise}
                    />
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
}

export default React.memo(WorkoutExercise)