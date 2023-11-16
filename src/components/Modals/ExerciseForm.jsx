import BODY_PARTS from "../../utils/Bodyparts";
import { useState } from "react";
import { TextField, FormControl, InputLabel, Select, Stack, MenuItem, Button } from "@mui/material";

import exerciseService from '../../services/exercises'
import { createExercise } from "../../redux/reducers/exerciseLibraryReducer";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ExerciseForm = ({ handleClose, exercise }) => {  // handleSave
    const [exerciseName, setExerciseName] = useState(exercise?.name)
    const [targetMuscle, setTargetMuscle] = useState(exercise?.muscle)

    const dispatch = useDispatch()

    const handleSave = async (exerciseName, targetMuscle) => {
        if ((exerciseName || targetMuscle) === ( '' || null || undefined )) {
            console.log('käyttäjälle ilmotus');
            toast.error("You must enter a name and choose a muscle!");
        }

        const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
        console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
        dispatch(createExercise(newExercise))
        handleClose()
        toast.success("Exercise saved succesfully!");
    }

    const handleChange = (event) => {
        event.preventDefault()
        setTargetMuscle(event.target.value)
    }

    return (
        <>
            <TextField label="Exercise name" variant="outlined" defaultValue={exercise?.name} onChange={(event) => setExerciseName(event.target.value)} />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Muscle</InputLabel>
                <Select
                    size="medium"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={targetMuscle}
                    label="Muscle"
                    onChange={(event) => handleChange(event)}
                >
                    {BODY_PARTS.map(BODY_PART => {
                        console.log(BODY_PART);
                        return <MenuItem key={BODY_PART} value={BODY_PART}>{BODY_PART}</MenuItem>
                    })}
                </Select>
                <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={() => handleSave(exerciseName, targetMuscle)}>Save</Button>
                </Stack>
            </FormControl>
        </>
    )
}

export default ExerciseForm

