import React, { useEffect, useState, useMemo } from "react"
import Set from "./Set"
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"

import DeleteIcon from "@mui/icons-material/Delete"
import generateId from "../../utils/generateId"

import { deleteExercise, editExerciseNote } from "../../redux/reducers/exerciseReducer"

const WorkoutExercise = ({ exercise, name }) => { // deleteExercise
    console.log("WorkoutExercise is rendering");
    /**
     * PIDÄ STATE LÄHELLÄ SITÄ COMPONENTTIA MILLE SE ON RELEVENTTI.
     * TÄSSÄ NÄYTTÄISI ETTÄ SETTIEN PITÄMINEN LIIAN YLHÄÄLLÄ HUONO
     */
    const noteFromStore = useSelector(state => state.exercises.find(e => e.id === exercise.id).note )  
    const [note, setNote] = useState(noteFromStore)
    const [focused, setFocused] = useState(false)
    const allSetsFromState = useSelector(state => state.sets) // filter funktio aiheuttaa varootuksen jos käyttää tässä kohtaa...!?
    //const sets = allSetsFromState.filter(set => set.exerciseId === exerciseId)
    const sets = React.useMemo(() => allSetsFromState.filter(set => set.exerciseId === exercise.id), [allSetsFromState])
    //console.log('WorkoutExercise: const sets: ', sets);
    const [setId, setSetId] = useState(1) // used for keys and sorting set order, TÄÄ ON HUONO KU SE RESETOITUU
    //const [isSetsLengthZero, setIsSetsLengthZero] = useState(sets.length === 0)
    // console.log('WorkoutExercise: const sets.length === 0: ', sets.length === 0);
    //console.log('WorkoutExercise: const !sets.length === 0: ', !(sets.length === 0));

    /* const memoSets = React.useMemo(() => {
        return {
            firstName: "Amr"
        }
    }, [])
 */



    const dispatch = useDispatch()

    /**
     * This hook prevents error "cannot update component while rendering a different component".
     * When use creates a new exercise, the default set of one is created and ActiveWorkout component cannot
     * update bc WorkoutExercise component is rendering the default set of one.
     */
    useEffect(() => {
        console.log('WorkoutExercise: useEffect() start');
        if (sets.length === 0) {
            console.log('WorkoutExercise: useEffect() creating a set');
            createSet(true) // tää aiheuttaa sen että ei scrollaa pohjaan
            //window.scrollTo(0, document.body.scrollHeight)
            // window.scrollTo(0, document.body.scrollHeight, "smooth")

            setTimeout(() => {
                console.log("Delayed for 1 second.");
                window.scrollTo({
                    top: document.body.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
            }, "100");

        }
    }, [])

    const removeExercise = (exerciseId) => {
        dispatch(deleteExercise(exerciseId))
    }


    const createSet = (warmup) => {
        console.log('WorkoutExercise: createSet() start');

        // default values for input
        let weight = 20
        let reps = 15
        // console.log('WorkoutExercise: const sets.length === 0: ', sets.length === 0);
        // console.log('WorkoutExercise: const isSetsLengthZero: ', isSetsLengthZero);
        // copying last done set values 
        if (!(sets.length === 0)) {
            let lastSet = sets[sets.length - 1]
            console.log("all sets ", sets);
            console.log("last set ", lastSet);
            weight = lastSet.weight
            reps = lastSet.reps
        }

        console.log("if over ");
        console.log("weight: ", weight);
        console.log("reps ", reps);

        const newSet = {
            id: generateId(),//setId,
            exerciseId: exercise.id,
            createdAt: new Date().toJSON(),
            warmup: warmup,
            weight: weight,
            reps: reps
        }

        console.log("This is the new set: ", newSet, " dispatching...");

        dispatch(addSet(newSet))

        setSetId(setId + 1)

        if (sets.length === 0) {
            console.log('WorkoutExercise: createSet(): sets length === 0...scrolling...');
            window.scrollTo(0, document.body.scrollHeight)
        }
    }


    let setNumber = 0

    const renderSets = () => {
        console.log('WorkoutExercise: renderSets() start');

        return (
            <Stack spacing={0}  >
                {sets.map((set, index) => {
                    console.log('mapping set:', set);
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
                })}
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
                    <Typography variant="h6">{name}</Typography>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeExercise(exercise.id)}
                        sx={{ marginBottom: 1 }}
                    >
                        <DeleteIcon />
                    </Button>
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
                    // onBlur={(event) => handleBlur(event)}
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
                    //sx={{ width: { xs: 0.8, sm: 0.3 } }}
                >
                    Add set
                </Button>
            </Box>
            {/* {renderWarmupButton()} */}
            <Divider sx={{ my: 3 }} />
        </Box>
    )
}

export default React.memo(WorkoutExercise)