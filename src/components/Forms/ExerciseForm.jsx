import BODY_PARTS from "../../utils/bodyparts"
import { useState, useRef, useEffect } from "react"

import { useDispatch } from "react-redux"
import { saveExercise } from "../../redux/reducers/exerciseLibraryReducer"

import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    Stack,
    MenuItem,
    FormHelperText
} from "@mui/material"

import FormButtons from "../Buttons/FormButtons"

const ExerciseForm = ({ exercise, onSubmit, onCancel, cancelButtonText, confirmButtonText, height }) => {

    // console.log("Rendering ExerciseForm ", exercise);

    const [exerciseName, setExerciseName] = useState(exercise?.name ? exercise.name : '')
    const [targetMuscle, setTargetMuscle] = useState(exercise?.muscle ? exercise.muscle : '')
    const [exerciseNameError, setExerciseNameError] = useState('')
    const [targetMuscleError, setTargetMuscleError] = useState('')

    const dispatch = useDispatch()
    const inputRef = useRef(null)

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
        //dispatch(saveExercise(exerciseName, targetMuscle))
        onSubmit ? onSubmit(exerciseName, targetMuscle) : null
    }

    useEffect(() => {
        inputRef.current.focus();
      }, []);

    return (
        <form onSubmit={handleSubmit}>
          <Stack justifyContent={"space-between"} height={height ? height : "auto" }> 

                <Stack spacing={2}>
                    <TextField
                        id="exerciseName"
                        ref={inputRef}
                        autoFocus={true}
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

                <FormButtons onCancel={onCancel} cancelButtonText={cancelButtonText} confirmButtonText={confirmButtonText} />

            </Stack>
        </form>
    )
}

export default ExerciseForm

