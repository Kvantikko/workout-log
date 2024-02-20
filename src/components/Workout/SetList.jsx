import { useEffect, useState, useMemo } from "react"

import { useSelector, useDispatch } from "react-redux"
import { addSetToTemplate, deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer"
import { selectFilteredSetIds } from '../../redux/selectors'
import { addSetToWorkout } from '../../redux/reducers/workoutReducer'

import { Box, Button  } from "@mui/material"
import { Add } from '@mui/icons-material'

import SetListItem from "./SetListItem"

const SetList = ({ type, exerciseId }) => {

    //console.log("Rendering SetList " )

    let setIds = useSelector(state => type === "active" ?
        state.workout.sets.byExerciseId[exerciseId] :
        state.template.sets.byExerciseId[exerciseId]
    ) || []

    const dispatch = useDispatch()

    /**
    * This hook prevents error "cannot update component while rendering a different component".
    * When use creates a new exercise, the default set of one is created and ActiveWorkout component cannot
    * update bc WorkoutExercise component is rendering the default set of one.
    */
    useEffect(() => {
        if (setIds.length === 0 || setIds === undefined) {
            createSet(true)
        }
    }, [])

    const createSet = (warmup) => {
        type === "active" ?
            dispatch(addSetToWorkout({ warmup: warmup, exerciseId: exerciseId })) :
            dispatch(addSetToTemplate({ warmup: warmup, exerciseId: exerciseId }))
    }

    return (
        <div className="workouSetList" >
            {/* <TransitionGroup> */}
            {setIds?.map((setId, index) => {
                return (
                    /*  <Collapse key={setId}> */
                    <SetListItem key={setId}
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

        </div>
    )
}

export default SetList