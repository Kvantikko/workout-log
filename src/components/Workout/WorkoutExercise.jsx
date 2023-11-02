import { useState } from "react"
import Set from "./Set"
import { Button, Divider, Box, TextField, Stack, Grid, Paper, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"

import DeleteIcon from "@mui/icons-material/Delete"

const WorkoutExercise = ({ exerciseId, name, exerciseSets, deleteExercise }) => {
    /**
     * PIDÄ STATE LÄHELLÄ SITÄ COMPONENTTIA MILLE SE ON RELEVENTTI.
     * TÄSSÄ NÄYTTÄISI ETTÄ SETTIEN PITÄMINEN LIIAN YLHÄÄLLÄ HUONO
     */
    const state = useSelector(state => state)
    console.log("HERE IN WORKOUTEXERCISE COMPONENT, STATE: ", state);
    const sets = useSelector(state => state.sets.filter(set => set.exerciseId !== exerciseId))
    console.log("SEEEEETS: ", sets)


    //const sets = exerciseSets
    const [setId, setSetId] = useState(1) // used for keys and sorting set order, TÄÄ ON HUONO KU SE RESETOITUU
    const [totalSetCount, setTotalSetCount] = useState(sets.length)
    const [workingSetCount, setWorkingSetCount] = useState(0)

    

    const dispatch = useDispatch()

    const createSet = (warmup) => {
        console.log('entering createSet function in component WorkoutExercise');

        // helpers because React's asynchronous rendering causes workingSetCount to be one less than supposed to
        const newTotal = totalSetCount + 1
        let newWorking = workingSetCount
        if (!warmup) { newWorking = workingSetCount + 1 }

        let weight = 20
        let reps = 15
        if (sets.length > 0) {
            let lastSet = sets[sets.length - 1]

            //console.log('all sets before addition ', sets);
            //console.log('last set ', lastSet);

            weight = lastSet.weight
            reps = lastSet.reps
        }

       // console.log(weight);
        //console.log(reps);

        const newSet = {
            id: setId,
            exerciseId: exerciseId,
            createdAt: new Date().toJSON(),
            warmup: warmup,
            weight: weight,
            reps: reps
        }
        


        // aiheuttaa errorin kerran
        console.log("PASKA");
        dispatch(addSet(newSet))
        console.log("PASKAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        //console.log("setti dispatchattu: ", sets );
        //console.log("exercises: ", exercises);

        //const newSets = sets.concat(newSet)
        //setSets(newSets)

        setTotalSetCount(newTotal)
        setWorkingSetCount(newWorking)

        setSetId(setId + 1)

       console.log("leaving create set function in component WorkoutExercise");
    }



    const removeSet = (setId, isWarmup) => {
        if (sets.length === 1) {
            console.log("kayttäjälle ilmotus että pitää olla ainakin yksi setti");
            return
        }

        dispatch(deleteSet(setId))

        setTotalSetCount(totalSetCount - 1)
        if (!isWarmup) { setWorkingSetCount(workingSetCount - 1) }

        if (workingSetCount > 0) {
            setWorkingSetCount(workingSetCount - 1)
        }

    }



    let setNumber = 0

    const renderSets = () => {
        console.log('entering render sets function');



        if (sets.length === 0) {
            console.log('no renderable sets');
            //return null
            createSet(true)
        }

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
                <Button variant="outlined" onClick={deleteExercise}>
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