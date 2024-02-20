import { useDispatch, useSelector } from "react-redux"
import { editWorkoutNote, setWorkoutName } from "../../redux/reducers/workoutReducer"
import { editTemplateNote, setTemplateName } from "../../redux/reducers/templateReducer"

import { Stack, Box, Typography } from "@mui/material"

import WorkoutTextField from "../Inputs/WorkoutTextField"
import StopWatch from "../Clock/StopWatch"

const InitialWorkoutDetails = ({ type }) => {

    const workoutStartTime = useSelector(state => type === "active" ? state.workout.workoutStartTime : null)
    const workoutName = useSelector(state => type === "active" ? state.workout.name : state.template.name)
    const note = useSelector(state => type === "active" ? state.workout.note : state.template.note)

    const dispatch = useDispatch()

    const handleNoteBlur = (note) => {
        type === "active" ?
            dispatch(editWorkoutNote(note)) :
            dispatch(editTemplateNote(note))
    }

    const handleNameBlur = (name) => {
        type === "active" ?
            dispatch(setWorkoutName(name)) :
            dispatch(setTemplateName(name))
    }

    return (
        <div className="initial-workout-details">

            {type === "active" &&
                <Box display={'flex'} flexDirection={'column'} paddingLeft={2} gap={1}>
                    <Stack
                        direction={'row'}
                        spacing={1}
                        alignContent={'center'}
                        alignItems={'center'}
                    >
                        <Typography variant="h6" color={'text.secondary'} >
                            Started at
                        </Typography>
                        <Typography variant="h6" color={'text.secondary'} >
                            {workoutStartTime !== null ? workoutStartTime : " --:--"}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={'row'}
                        spacing={1}
                        alignContent={'center'}
                        alignItems={'center'}
                    >
                        <Typography variant="h6" color={'text.secondary'} >
                            Elapsed time
                        </Typography>
                        <StopWatch size="h6" showButtons={true} />
                    </Stack>
                </Box>
            }

            <Stack spacing={3} marginTop={3}>
                <WorkoutTextField value={workoutName} handleBlur={handleNameBlur} placeholder={"Workout name"} />
                <WorkoutTextField value={note} handleBlur={handleNoteBlur} placeholder={"Workout note"} />
            </Stack>
        </div>
    )
}

export default InitialWorkoutDetails