import BODY_PARTS from "../../utils/Bodyparts";
import { useState } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    Stack,
    MenuItem,
    Button,
    FormHelperText
}from "@mui/material";

import exerciseService from '../../services/exercises'
import { createExercise } from "../../redux/reducers/exerciseLibraryReducer";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ExerciseForm = ({ handleClose, exercise, handleSave, error }) => {
    console.log("Rendering ExerciseForm ", error);
    const [exerciseName, setExerciseName] = useState(exercise?.name ? exercise.name : '')
    const [targetMuscle, setTargetMuscle] = useState(exercise?.muscle ? exercise.muscle : '')
    const [exerciseNameError, setExerciseNameError] = useState(error)
    const [targetMuscleError, setTargetMuscleError] = useState('')
    console.log("pasaaa", exerciseNameError);

    const handleChange = (event) => {
        event.preventDefault()
        setTargetMuscle(event.target.value)
    }

    const saveExercise = () => {
        if (exerciseName === '') {
            setExerciseNameError('Required')
        }
        if (targetMuscle === '') {
            setTargetMuscleError('Required')
        }
        if (targetMuscle === '' || exerciseName === '') {
            return
        }
        handleSave(exerciseName, targetMuscle)
    }

    return (
        <>
            <TextField
                //id="exerciseName"
                label="Exercise name"
                variant="outlined"
                defaultValue={exercise?.name}
                onChange={(event) => setExerciseName(event.target.value)}
                onClick={() => setExerciseNameError('')}
                error={!(exerciseNameError === '')}
                helperText={exerciseNameError}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Muscle</InputLabel>
                <Select
                    size="medium"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={targetMuscle}
                    label="Muscle"
                    onChange={(event) => handleChange(event)}
                    onClick={() => setTargetMuscleError('')}
                    error={!(targetMuscleError === '')}
                    helperText={targetMuscleError}
                >
                    {BODY_PARTS.map(BODY_PART => {
                        // console.log(BODY_PART);
                        return <MenuItem key={BODY_PART} value={BODY_PART}>{BODY_PART}</MenuItem>
                    })}
                </Select>
                <FormHelperText error>{targetMuscleError}</FormHelperText>
                <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={saveExercise}>Save</Button>
                </Stack>
            </FormControl>
        </>
    )
}

export default ExerciseForm

