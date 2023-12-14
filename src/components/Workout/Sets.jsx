import { TransitionGroup } from 'react-transition-group';
import SetRow from "./SetRow"
import { Stack, Box, Button, Collapse } from "@mui/material"
import React, { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addSet, deleteSet } from "../../redux/reducers/setReducer"
import generateId from "../../utils/generateId"
import { addSetToTemplate, deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer";

import { selectFilteredSets } from '../../redux/selectors';




const Sets = ({ type, exercise }) => {

    console.log("Rendering Sets ", exercise.name);

    //let allSetsFromState
    let sets //= useSelector((state) => selectFilteredSets(state, exercise.id))
    switch (type) {
        case "active":
            //sets = useSelector((state) => selectFilteredSets(state, exercise.id))

            /* sets = useSelector(createSelector(
                (state) => { return state.sets.filter(set => set.exerciseId === exercise.id) },
               
            )) */
            //allSetsFromState = useSelector(state => state.sets)
            sets = useSelector(state => state.sets)
            //sets = useSelector(state => state.sets)//useSelector((state) => selectFilteredSets(state, exercise.id))
            //sets = selectFilteredSets(state => state.sets, exercise) //useSelector(state => state.sets.filter(set => set.exerciseId === exercise.id))
            break;
        case "template":
            sets = useSelector(state => selectFilteredSets(state, exercise.id))
            //allSetsFromState = useSelector(state => selectAllSets(state, exercise.id))//useSelector(selectAllSets)
            //allSetsFromState = useSelector(state => state.template.sets.allIds.map(id => state.template.sets.byId[id]))
            //sets = []
            // sets = useSelector(state => state.template.sets.filter(set => set.exerciseId === exercise.id))
            break;
        default:
            throw new Error('Component Workout must have a type prop specified!');
    }
    //sets = allSetsFromState.filter(set => set.exerciseId === exercise.id)
    
    console.log("Sets component sets: " , sets)

    //const sets = React.useMemo(() => allSetsFromState.filter(set => set.exerciseId === exercise.id), [allSetsFromState])

    //const sets = useMemo(() => xsets, [xsets]);

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
                throw new Error('Component must have a type prop specified!')
        }
    }

    let setNumber = 0

    return (
        <>

            <TransitionGroup>
                {sets.map((set, index) => {
                    if (!set.warmup) {
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

            <Box key={exercise.id} textAlign='center' sx={{ mt: 2 }} > {/* box is for centering the button */}
                <Button
                    variant="text"
                    onClick={() => createSet(false)}
                    fullWidth
                >
                    Add set
                </Button>
            </Box>

        </>
    )
}

export default React.memo(Sets)