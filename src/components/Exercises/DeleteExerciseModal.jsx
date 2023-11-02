import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createExercise, addExercise, removeExercise } from '../../redux/reducers/exerciseLibraryReducer'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { openDeleteModal, closeModal } from '../../redux/reducers/modalReducer'


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

const DeleteExerciseModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.modal.isOpenDelete)
    const exercise = useSelector(state => state.modal.exercise)
   

    const deleteExercise = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        const response = await exerciseService.remove(exercise?.id)
        console.log(response)
        //(removeExercise(modal.exercise.id)) 
        handleClose()
    }

    const handleClose = () => {
        console.log("handling close");
        dispatch(closeModal())
    }


    return (
        <div>
            {/* <Button variant="contained" onClick={() => setOpen(true)}>
                <DeleteForeverIcon/>
            </Button> */}
            <Modal open={isOpen} onClose={handleClose}>
                <Stack sx={style}>
                    <h3>
                        Delete exercise?
                    </h3>
                    <h4>
                        Are you sure you want to remove this exercise and its history from the database?
                        This action cannot be undone
                    </h4>
                    <Stack direction='row'>
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" onClick={deleteExercise}>Yes, I understand</Button>
                        </Stack>
                </Stack>
            </Modal>
        </div>
    );
}

export default DeleteExerciseModal;