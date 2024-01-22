import BODY_PARTS from "../../utils/Bodyparts"
import { useState, useRef } from "react"
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    Stack,
    Box,
    MenuItem,
    Button,
    FormHelperText
} from "@mui/material";

import { useDispatch } from "react-redux"
import FormButtons from "../Buttons/FormButtons"


const ExerciseForm = ({ exercise, onSubmit, onCancel }) => {
    console.log("Rendering ExerciseForm ", exercise);
    const [exerciseName, setExerciseName] = useState(exercise?.name ? exercise.name : '')
    const [targetMuscle, setTargetMuscle] = useState(exercise?.muscle ? exercise.muscle : '')
    const [exerciseNameError, setExerciseNameError] = useState('')
    const [targetMuscleError, setTargetMuscleError] = useState('')

    const dispatch = useDispatch()
    //const inputRef = useRef(null)


    const handleChange = (event) => {
        event.preventDefault()
        setTargetMuscle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (exerciseName === '') {
            setExerciseNameError('Required')
        }
        if (targetMuscle === '') {
            setTargetMuscleError('Required')
        }
        if (targetMuscle === '' || exerciseName === '') {
            return
        }
        onSubmit(exerciseName, targetMuscle)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    //id="exerciseName"
                    // ref={inputRef}
                    autoFocus
                    label="Exercise name"
                    variant="outlined"
                    size="small"
                    defaultValue={exercise?.name}
                    onChange={(event) => setExerciseName(event.target.value)}
                    onClick={() => setExerciseNameError('')}
                    error={!(exerciseNameError === '')}
                    helperText={exerciseNameError}
                />
                <FormControl fullWidth size="small" >
                    <InputLabel id="select-exercise-label">
                        Muscle
                    </InputLabel>
                    <Select
                        size="small"
                        labelId="select-exercise-label"
                        id="select-exercise"
                        value={targetMuscle}
                        label="Muscle"
                        onChange={(event) => handleChange(event)}
                        onClick={() => setTargetMuscleError('')}
                        error={!(targetMuscleError === '')}
                    >
                        {BODY_PARTS.map(BODY_PART => {
                            // console.log(BODY_PART);
                            return <MenuItem key={BODY_PART} value={BODY_PART}>{BODY_PART}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText error>{targetMuscleError}</FormHelperText>

                </FormControl>
            </Stack>

            <FormButtons onCancel={onCancel} />

        </form>
    )
}

export default ExerciseForm

