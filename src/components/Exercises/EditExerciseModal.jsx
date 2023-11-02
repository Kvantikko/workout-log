import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, addExercise, updateExercise } from '../../redux/reducers/exerciseLibraryReducer'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { closeModal } from '../../redux/reducers/modalReducer'


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

const handleClose = () => {
    dispatch(closeModal())
}

const EditExerciseModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.modal.isOpenEdit)
    const exercise = useSelector(state => state.modal.exercise)

    const [exerciseName, setExerciseName] = useState(exercise?.name)
    const [targetMuscle, setTargetMuscle] = useState(exercise?.muscle)

    const editExercise = async () => {
        const updatedExercise = await exerciseService.update(exercise.id, exerciseName, targetMuscle) // miks servun pitäis lähettää takas? generoitu i?
        console.log('servu palautti: ', updatedExercise, ' dispatchataan storeen')
        dispatch(updateExercise(updatedExercise))
        setOpen(false)
    }

    const handleClose = () => {
        dispatch(closeModal())
    }


    return (
        <div>
            {/* <Button variant="contained" onClick={() => setOpen(true)}>Edit</Button> */}
            <Modal open={isOpen} onClose={handleClose}>
                <Stack sx={style}>
                    <h2>Edit existing exercise</h2>
                    <TextField label="Exercise name" variant="outlined" defaultValue={exercise?.name} onChange={(event) => setExerciseName(event.target.value)} />
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
                            onChange={(event) => setTargetMuscle(event.target.value)}
                        >
                            <MenuItem value={'Chest'}>Chest</MenuItem>
                            <MenuItem value={'Biceps'}>Biceps</MenuItem>
                            <MenuItem value={'Quads'}>Quads</MenuItem>
                        </Select>
                        <Stack direction='row'>
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" onClick={editExercise}>Save</Button>
                        </Stack>
                    </FormControl>
                </Stack>
            </Modal>
        </div>
    );
}

export default EditExerciseModal;