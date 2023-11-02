import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, addExercise, removeExercise } from '../../redux/reducers/exerciseLibraryReducer'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import exerciseService from '../../services/exercises'


import { clearWorkout } from "../../redux/reducers/workoutReducer"

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { stopWatch } from '../../redux/reducers/stopWatchReducer'
import { clearSets } from '../../redux/reducers/setReducer'


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

const DiscardWorkoutModal = ({ exercise }) => {
    const [open, setOpen] = useState(false)
   

    const dispatch = useDispatch()

    const deleteExercise = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        const response = await exerciseService.remove(exercise.id)
        console.log(response)
        dispatch(removeExercise(exercise.id)) 
        setOpen(false)
    }

    const handleWorkoutClose = () => {
        dispatch(clearWorkout())
        dispatch(clearSets())
        dispatch(stopWatch())
    }


    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Cancel
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Stack sx={style}>
                    <h3>
                        Discard ongoing workout?
                    </h3>
                    <Stack direction='row'>
                            <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" onClick={handleWorkoutClose}>Yes</Button>
                        </Stack>
                </Stack>
            </Modal>
        </div>
    );
}

export default DiscardWorkoutModal;