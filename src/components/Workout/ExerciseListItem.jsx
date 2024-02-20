import { memo, forwardRef } from "react"

import { Divider, Box, Stack, Typography, IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

import { useDispatch, useSelector } from "react-redux"
import {
    editTemplateExerciseNote,
    moveExerciseDownTemplate,
    moveExerciseUppTemplate
} from "../../redux/reducers/templateReducer"
import {
    deleteExerciseFromWorkout,
    editWorkoutExerciseNote,
    moveExerciseDownWorkout,
    moveExerciseUppWorkout
} from "../../redux/reducers/workoutReducer"
import { deleteExerciseFromTemplate } from "../../redux/reducers/templateReducer"

import SetList from "./SetList"
import NoteField from "../Inputs/WorkoutTextField"
import WorkoutExerciseMenu from "../Menus/WorkoutExerciseMenu"

const ExerciseListItem = forwardRef(({ exerciseId, arrayEnd, arrayStart, type }, ref) => {

    const exercise = useSelector(state => type === "active" ?
        state.workout.exercises.byId[exerciseId] :
        state.template.exercises.byId[exerciseId]
    )
    const exerciseName = useSelector(state => state.exerciseLibrary.exercises.find(e =>
        e.id === exercise?.exerciseId
    ))?.name

    const dispatch = useDispatch()

    const removeExercise = () => {
        type === "active" ?
            dispatch(deleteExerciseFromWorkout(exerciseId)) :
            dispatch(deleteExerciseFromTemplate(exerciseId))
    }

    const handleSwapDown = () => {
        type === "active" ?
            dispatch(moveExerciseDownWorkout(exercise.id)) :
            dispatch(moveExerciseDownTemplate(exercise.id))
    }

    const handleSwapUpp = () => {
        type === "active" ?
            dispatch(moveExerciseUppWorkout(exercise.id)) :
            dispatch(moveExerciseUppTemplate(exercise.id))
    }

    const handleBlur = (note) => {
        const changedExercise = { ...exercise, note: note }
        type === "active" ?
            dispatch(editWorkoutExerciseNote({ exerciseId: exercise.id, changedExercise: changedExercise })) :
            dispatch(editTemplateExerciseNote({ exerciseId: exercise.id, changedExercise: changedExercise }))
    }

    return (
        <Box ref={ref} sx={{ alignItems: 'center' }}>
            <Box paddingX={2}>

                <Stack direction={"row"} sx={{ justifyContent: "space-between" }} alignItems={'center'}>
                    <Typography variant="h6">{exerciseName}</Typography>
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
                        <WorkoutExerciseMenu
                            exercise={exercise}
                            handleDelete={removeExercise}
                        />
                    </Stack>
                </Stack>

                <NoteField note={exercise?.note} handleBlur={handleBlur} placeholder={"Exercise note"}></NoteField>

                <Stack direction={"row"} spacing={1} sx={{ justifyContent: "space-between", my: 1 }}>
                    <Box sx={{ maxWidth: 0.2, minWidth: 0.1 }} textAlign={'center'} >Set</Box>
                    <Box sx={{ width: 100, minWidth: 80 }} textAlign={'center'} >Kg</Box>
                    <Box sx={{ width: 100, minWidth: 40 }} textAlign={'center'} >Reps</Box>
                    <Box sx={{ minWidth: 0.1 }} textAlign={'center'} ></Box>
                    <Box sx={{ width: 0.07 }} textAlign={'center'} ></Box>
                </Stack>

            </Box>

            <SetList type={type} exerciseId={exerciseId} />

            <Divider sx={{ my: 3 }} />
        </Box>
    )
})

export default memo(ExerciseListItem)