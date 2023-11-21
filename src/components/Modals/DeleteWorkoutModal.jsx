
import { removeExercise } from '../../redux/reducers/exerciseLibraryReducer'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import WarningIcon from '@mui/icons-material/Warning';

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'


const DeleteWorkoutModal = () => {
    return (
        <>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <WarningIcon color='warning' fontSize='large'/>
                <Typography variant='h4'>Warning!</Typography>
            </Stack>
            <Typography>
                Are you sure you want to delete this workout from history?
            </Typography>
        </>
    );
}

export default DeleteWorkoutModal;