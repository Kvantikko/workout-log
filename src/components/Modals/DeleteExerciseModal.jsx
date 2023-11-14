
import { removeExercise } from '../../redux/reducers/exerciseLibraryReducer'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import { useDispatch } from 'react-redux'


const DeleteExerciseModal = ({ handleClose, exercise }) => {
    const dispatch = useDispatch()

    const deleteExercise = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        const response = await exerciseService.remove(exercise?.id)
        console.log(response)
        if (response.status === 200) {
            dispatch(removeExercise(exercise.id))
            handleClose()
        }
    }

    return (
        <Stack >
            <h4>
                Are you sure you want to remove this exercise and its history from the database?
                This action cannot be undone
            </h4>
            <Stack direction='row'>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={deleteExercise}>Yes, I understand</Button>
            </Stack>
        </Stack>
    );
}

export default DeleteExerciseModal;