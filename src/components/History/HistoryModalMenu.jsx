import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Box, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useDispatch } from 'react-redux';
import { openDeleteModal, openEditModal, closeModal } from '../../redux/reducers/modalReducer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ConfirmationModal from '../Modals/ConfirmationModal';
import { toast } from 'react-toastify';

import exerciseService from '../../services/exercises'
import { removeExercise } from '../../redux/reducers/exerciseLibraryReducer';
import FormModal from '../Modals/FormModal';
import ModalRoot from '../Modals/ModalRoot'
import { useNavigate } from 'react-router-dom';

const HistoryModalMenu = ({ workout }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);


    const handleOpenMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        console.log("handling close");
        setAnchorEl(null)
    }

    const handleMenuClick = (event, modalType) => {
        //event.stopPropagation()

        handleClose()
    }



    const deleteWorkout = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        try {
            const response = await exerciseService.remove(exercise?.id)
            dispatch(removeExercise(exercise.id))
            handleClose()
            toast.success("Exercise deleted succesfully!");
            navigate('/exercises')
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <Box
            display="flex"
        >
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenuClick}
                sx={{ minWidth: 0, padding: 0 }}
                variant='secondary'
            >
                <MoreVertIcon sx={{ padding: 0 }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <FormModal
                    menuItem={true}
                    modalType='editWorkout'
                    color='info'
                    openButton={
                        <Stack direction="row" spacing={1}>
                            <EditIcon color='info' />
                            <div>Edit</div>
                        </Stack>
                    }
                    //confirmButton='Save'
                    //confirmFunction={deleteExercise}
                    object={workout}
                    handleMenuClose={handleClose}
                /> 
                <ConfirmationModal
                    menuItem={true}
                    modalType='deleteWorkout'
                    color='error'
                    openButton={
                        <Stack direction={'row'} spacing={1}>
                            <DeleteForeverIcon color='error' />
                            <div>Delete</div>
                        </Stack>
                    }
                    confirmButton='Delete'
                    confirmFunction={deleteWorkout}
                    handleMenuClose={handleClose}
                />
            </Menu>
        </Box>
    );
}

export default HistoryModalMenu