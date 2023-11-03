import { useEffect, useState } from "react"
import Set from "./Set"
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"

import DeleteIcon from "@mui/icons-material/Delete"
import generateId from "../../utils/generateId"

const WorkoutExercise = ({ exerciseId, name, deleteExercise }) => {
    /**
     * PIDÄ STATE LÄHELLÄ SITÄ COMPONENTTIA MILLE SE ON RELEVENTTI.
     * TÄSSÄ NÄYTTÄISI ETTÄ SETTIEN PITÄMINEN LIIAN YLHÄÄLLÄ HUONO
     */
    const allSetsFromState = useSelector(state => state.sets) // filter funktio aiheuttaa varootuksen jos käyttää tässä kohtaa...!?
    const sets = allSetsFromState.filter(set => set.exerciseId === exerciseId)
    console.log('WorkoutExercise: const sets: ', sets);
    const [setId, setSetId] = useState(1) // used for keys and sorting set order, TÄÄ ON HUONO KU SE RESETOITUU
    //const [isSetsLengthZero, setIsSetsLengthZero] = useState(sets.length === 0)
    console.log('WorkoutExercise: const sets.length === 0: ', sets.length === 0);
    console.log('WorkoutExercise: const !sets.length === 0: ', !(sets.length === 0));
    

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
            createSet(true)
        }
    }, [])


    const createSet = (warmup) => {
        console.log('WorkoutExercise: createSet() start');

        // default values for input
        let weight = 20
        let reps = 15
       // console.log('WorkoutExercise: const sets.length === 0: ', sets.length === 0);
       // console.log('WorkoutExercise: const isSetsLengthZero: ', isSetsLengthZero);
        // copying last done set values 
        if (!(sets.length === 0)) {
            console.log('WorkoutExercise: createSet(): PILLUUUUUUUUUUUUUUUUUUUUUUU');
            let lastSet = sets[sets.length - 1]
            console.log(lastSet);
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
    }



    const removeSet = (setId, isWarmup) => {
        if (sets.length === 1) {
            console.log("kayttäjälle ilmotus että pitää olla ainakin yksi setti");
            return
        }

        dispatch(deleteSet(setId))

        //setTotalSetCount(totalSetCount - 1)
        //if (!isWarmup) { setWorkingSetCount(workingSetCount - 1) }

       /*  if (workingSetCount > 0) {
            setWorkingSetCount(workingSetCount - 1)
        }
 */
    }



    let setNumber = 0

    const renderSets = () => {
        console.log('WorkoutExercise: renderSets() start');

        return (
            <Stack spacing={1.5}  >
                {sets.map((set) => {
                    console.log('mapping set:', set);
                    if (!set.warmup) {
                        //console.log('this is NOT a warmup set');
                        setNumber = setNumber + 1
                    }
                    return (
                        <Set key={set.id}
                            exerciseId={exerciseId}
                            setId={set.id}
                            number={set.warmup === true ? 0 : setNumber}
                            setWeight={set.weight}
                            setReps={set.reps}
                            warmup={set.warmup}
                            deleteSet={() => removeSet(set.id, set.warmup)}
                            exerciseSets={sets}
                        // setSets={setSets}
                        />
                    )
                })}
            </Stack>
        )
    }

    //const existsWorkingSets = () => sets.filter((set) => set.warmup !== true).length > 0

    // renders disabled button if working sets exists
    /* const renderWarmupButton = () => {
        if (existsWorkingSets()) {
            return (
                <Button variant="outlined" disabled onMouseOver={() => console.log('hover')}>
                    Add warmup set
                </Button>
            )
        }
        return (
            <Button variant="outlined" onClick={() => createSet(true)}>
                Add warmup set
            </Button>
        )
    } */

    return (
        
        <Box sx={{ alignItems: 'center', backgroundColor: "white" }}>
            {console.log("rendering workoutExercise")}
            <Stack direction={"row"} sx={{ justifyContent: "space-between", backgroundColor: "white" }}>
                <Typography variant="h6">{name}</Typography>
                <Button variant="outlined" onClick={() => deleteExercise(exerciseId)}>
                    <DeleteIcon />
                </Button>
            </Stack>
            <Stack direction={"row"} spacing={6} sx={{ justifyContent: "space-between", backgroundColor: "white", my: 1 }}>
                <Box sx={{ width: 20}}>Set</Box>
                <Box sx={{ width: 70}}>Kg</Box>
                <Box sx={{ width: 70}}>Reps</Box>
                <Box sx={{ width: 50}}></Box>
                <Box sx={{ width: 50}}></Box>
            </Stack>
            {renderSets()}
            <Box textAlign='center' sx={{ mt: 2 }} > {/* box is for centering the button */}
                <Button variant="contained" onClick={() => createSet(false)} sx={{ width:0.6 }}  >
                    Add set
                </Button>
            </Box>
            {/* {renderWarmupButton()} */}
            <Divider sx={{ my: 3 }} />
        </Box>
    )
}

export default WorkoutExercise