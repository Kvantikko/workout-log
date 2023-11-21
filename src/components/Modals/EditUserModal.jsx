import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import WarningIcon from '@mui/icons-material/Warning';

import exerciseService from '../../services/exercises'

import { Box, Button, Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'

import UserForm from '../Forms/UserForm'


const EditUserModal = ({ confirmFunction, confirmButton, color }) => {
    const user = useSelector(state => state.user)

    return (
        <>
            <Stack direction={'row'} spacing={3} justifyContent={'center'}>
                {/* <WarningIcon color='warning' fontSize='large' /> */}
                <Typography variant='h5'>Edit user details</Typography>
            </Stack>
{/*             <Typography>
                Some typography
            </Typography> */}
            <UserForm user={user} submitButton={confirmButton}/>
           {/*  <Button
                variant="contained"
                onClick={confirmFunction}
                color={color}
            >
                {confirmButton ? confirmButton : <div>Ok</div>}
            </Button> */}
        </>
    );
}

export default EditUserModal



