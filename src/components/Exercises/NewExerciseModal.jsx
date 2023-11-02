import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, addExercise } from '../../redux/reducers/exerciseLibraryReducer'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'


import AddIcon from '@mui/icons-material/Add';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const NewExerciseModal = ({ searchInput }) => {
    const [open, setOpen] = useState(false)
    const [exerciseName, setExerciseName] = useState(searchInput);
    const [targetMuscle, setTargetMuscle] = useState('Chest')

    //console.log(searchInput);

    //console.log(exerciseName);
    //console.log(targetMuscle);

    const dispatch = useDispatch()

    /* const saveExercise = () => {
        console.log("saving execise");
        dispatch(createExercise({
            name: exerciseName,
            muscle: targetMuscle
        }))
        setOpen(false)


    } */

    const saveExercise = async (event) => {
        //event.preventDefault() // ilman tätä clientti lähettää uusia luonti pyyntjö palvelimelle loputtomiin, console error
        const newExercise = await exerciseService.createNew(exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
        console.log('servu palautti: ', newExercise, ' dispatchataan storeen')
        dispatch(addExercise(newExercise))
        setOpen(false)
    }

    const handleChange = (event) => {
        event.preventDefault()
        setTargetMuscle(event.target.value)

    }


    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>
                <AddIcon/>
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Stack sx={style}>
                    <h2>Add a new exercise</h2>
                    <TextField label="Exercise name" variant="outlined" defaultValue={searchInput} onChange={(event) => setExerciseName(event.target.value)} />
                    {/* <TextField
                        error
                        id="outlined-error-helper-text"
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Incorrect entry."
                    /> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Muscle</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={'Chest'}
                            label="Muscle"
                            onChange={(event) => handleChange(event)}
                        >
                            <MenuItem value={'Chest'}>Chest</MenuItem>
                            <MenuItem value={'Biceps'}>Biceps</MenuItem>
                            <MenuItem value={'Quads'}>Quads</MenuItem>
                        </Select>
                        <Stack direction='row'>
                            <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" onClick={saveExercise}>Save</Button>
                        </Stack>
                    </FormControl>
                </Stack>
            </Modal>
        </div>
    );
}

export default NewExerciseModal;