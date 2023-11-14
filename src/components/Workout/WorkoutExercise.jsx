import React, { useEffect, useState, useMemo } from "react"
import Set from "./Set"
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"

import DeleteIcon from "@mui/icons-material/Delete"
import generateId from "../../utils/generateId"

import { deleteExercise } from "../../redux/reducers/exerciseReducer"

const WorkoutExercise = ({ exerciseId, name }) => { // deleteExercise
    console.log("WorkoutExercise is rendering");
    /**
     * PIDÄ STATE LÄHELLÄ SITÄ COMPONENTTIA MILLE SE ON RELEVENTTI.
     * TÄSSÄ NÄYTTÄISI ETTÄ SETTIEN PITÄMINEN LIIAN YLHÄÄLLÄ HUONO
     */
    const allSetsFromState = useSelector(state => state.sets) // filter funktio aiheuttaa varootuksen jos käyttää tässä kohtaa...!?
    //const sets = allSetsFromState.filter(set => set.exerciseId === exerciseId)
    const sets = React.useMemo(() =>  allSetsFromState.filter(set => set.exerciseId === exerciseId), [allSetsFromState]  )
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
            // console.log(lastSet);
            weight = lastSet.weight
            reps = lastSet.reps
        }

        const newSet = {
            id: generateId(),//setId,
            exerciseId: exerciseId,
            createdAt: new Date().toJSON(),
            warmup: warmup,
            weight: weight,
            reps: reps
        }

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
                })}
            </Stack>
        )
    }

    return (

        <Box sx={{ alignItems: 'center', backgroundColor: "white" }}>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", backgroundColor: "white" }}>
                <Typography variant="h6">{name}</Typography>
                <Button variant="outlined" color="error" onClick={() => removeExercise(exerciseId)}>
                    <DeleteIcon />
                </Button>
            </Stack>
            <Stack direction={"row"} spacing={6} sx={{ justifyContent: "space-between", backgroundColor: "white", my: 1 }}>
                <Box sx={{ width: 20 }}>Set</Box>
                <Box sx={{ width: 70 }}>Kg</Box>
                <Box sx={{ width: 70 }}>Reps</Box>
                <Box sx={{ width: 50 }}></Box>
                <Box sx={{ width: 50 }}></Box>
            </Stack>
            {renderSets()}
            <Box textAlign='center' sx={{ mt: 2 }} > {/* box is for centering the button */}
                <Button variant="contained" onClick={() => createSet(false)} sx={{ width: 0.6 }}  >
                    Add set
                </Button>
            </Box>
            {/* {renderWarmupButton()} */}
            <Divider sx={{ my: 3 }} />
        </Box>
    )
}

export default React.memo(WorkoutExercise)