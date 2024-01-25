import { TransitionGroup } from 'react-transition-group';
import SetRow from "./SetRow"
import { Stack, Box, Button, Collapse } from "@mui/material"
import React, { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import generateId from "../../utils/generateId"
import { addSetToTemplate, deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer";

import { selectFilteredSetIds } from '../../redux/selectors';
import { addSetToWorkout } from '../../redux/reducers/workoutReducer';
import { Add } from '@mui/icons-material';




const Sets = ({ type, exerciseId }) => {

    //console.log("Rendering Sets " )

    //let allSetsFromState
    let setIds = [] //= useSelector((state) => selectFilteredSets(state, exercise.id))
    switch (type) {
        case "active":
            //sets = useSelector((state) => selectFilteredSets(state, exercise.id))

            /* sets = useSelector(createSelector(
                (state) => { return state.sets.filter(set => set.exerciseId === exercise.id) },
               
            )) */
            //allSetsFromState = useSelector(state => state.sets)
            setIds = useSelector(state => state.workout.sets.byExerciseId[exerciseId]) || []
            //sets = useSelector(state => state.sets)//useSelector((state) => selectFilteredSets(state, exercise.id))
            //sets = selectFilteredSets(state => state.sets, exercise) //useSelector(state => state.sets.filter(set => set.exerciseId === exercise.id))
            break;
        case "template":
            setIds = useSelector(state => state.template.sets.byExerciseId[exerciseId]) || []
            //setIds = useSelector(state => selectFilteredSetIds(state, exercise.id))
            //allSetsFromState = useSelector(state => selectAllSets(state, exercise.id))//useSelector(selectAllSets)
            //allSetsFromState = useSelector(state => state.template.sets.allIds.map(id => state.template.sets.byId[id]))
            //sets = []
            // sets = useSelector(state => state.template.sets.filter(set => set.exerciseId === exercise.id))
            break;
        default:
            throw new Error('Component Workout must have a type prop specified!');
    }
    //sets = allSetsFromState.filter(set => set.exerciseId === exercise.id)

    //setIds = setIds.map(id => useMemo(id))
   // React.useMemo(() => allSetsFromState.filter(set => set.exerciseId === exercise.id), [allSetsFromState])

    //const sets = useMemo(() => xsets, [xsets]);

    const dispatch = useDispatch()

    /**
    * This hook prevents error "cannot update component while rendering a different component".
    * When use creates a new exercise, the default set of one is created and ActiveWorkout component cannot
    * update bc WorkoutExercise component is rendering the default set of one.
    */
    // REMEMEER: useEffect is executed after a render
    useEffect(() => {
        if (setIds.length === 0 || setIds === undefined) {
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
        switch (type) {
            case "active":
                dispatch(addSetToWorkout({ warmup: warmup, exerciseId: exerciseId}))
                break
            case "template":
                dispatch(addSetToTemplate({ warmup: warmup, exerciseId: exerciseId}))
                break
            default:
                throw new Error('Component must have a type prop specified!')
        }
    }

    return (
        <>
            {/* <TransitionGroup> */}
                {setIds?.map((setId, index) => {
                
                    return (
                       /*  <Collapse key={setId}> */
                            <SetRow key={setId}
                                setId={setId}
                                //index={index}
                                type={type}
                                isOneSetLeft={setIds.length < 2 ? true : false}
                            />
                      /*   </Collapse> */
                    )
                })}
           {/*  </TransitionGroup> */}

            <Box key={exerciseId} textAlign='center' sx={{ mt: 2 }} > {/* box is for centering the button */}
                <Button
                    variant="text"
                    onClick={() => createSet(false)}
                    fullWidth
                >
                    <Add sx={{ marginRight: 1 }} />
                    Add set
                </Button>
            </Box>

        </>
    )
}

export default Sets