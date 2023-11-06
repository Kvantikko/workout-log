import BODY_PARTS from "../../utils/Bodyparts";
import { useState } from "react";
import { TextField, FormControl, InputLabel, Select, Stack, MenuItem, Button } from "@mui/material";

const ExerciseForm = ({ handleClose, handleSave, exercise }) => {
    const [exerciseName, setExerciseName] = useState(exercise?.name)
    const [targetMuscle, setTargetMuscle] = useState(exercise?.muscle)

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
                <Stack direction='row'>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={() => handleSave(exerciseName, targetMuscle)}>Save</Button>
                </Stack>
            </FormControl>
        </>
    )
}

export default ExerciseForm

