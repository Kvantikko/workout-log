
import { removeExercise } from '../../redux/reducers/exerciseLibraryReducer'

import WarningIcon from '@mui/icons-material/Warning'

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, Typography } from '@mui/material'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'


const DeleteExerciseModal = ({ handleClose, exercise }) => {
    return (
        <>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <WarningIcon color='warning' fontSize='large' />
                <Typography variant='h4'>Warning!</Typography>
            </Stack>
            <Typography>
                Are you sure you want to remove this exercise and its history from the database?
                This action cannot be undone
            </Typography>
        </>
    );
}

export default DeleteExerciseModal;