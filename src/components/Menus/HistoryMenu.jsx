import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Box, ListItemButton, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useDispatch } from 'react-redux';
import { openDeleteModal, openEditModal, closeModal } from '../../redux/reducers/modalReducer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import BasicModal from '../Modals/BasicModal';

import { toast } from 'react-toastify';

import workoutService from '../../services/workouts'
import { removeExercise } from '../../redux/reducers/exerciseLibraryReducer';

import { useNavigate } from 'react-router-dom';

import { removeFromHistory } from '../../redux/reducers/historyReducer';
import CreateEditWorkoutModal from '../Modals/CreateEditWorkoutModal';

const HistoryMenu = ({ workout }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)


    const handleOpenMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setOpenDelete(false)
        setOpenEdit(false)
        setAnchorEl(null)
    }

    const deleteWorkout = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        try {
            const response = await workoutService.remove(workout?.id)
            dispatch(removeFromHistory(workout?.id))
            handleClose()
            toast.success("Workout deleted!");
            navigate('/history')
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <Box display="flex">
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
                <ListItemButton onClick={() => setOpenEdit(true)}>
                    <Stack direction="row" spacing={1}>
                        <EditIcon color='info' />
                        <div>Edit</div>
                    </Stack>
                </ListItemButton>
                <ListItemButton onClick={() => setOpenDelete(true)}>
                    <Stack direction={'row'} spacing={1}>
                        <DeleteForeverIcon color='error' />
                        <div>Delete</div>
                    </Stack>
                </ListItemButton>
            </Menu>
            <BasicModal
                open={openDelete}
                onClose={() => handleClose()}
                title="Delete workout?"
                subTitle="Are you sure you want to delete this workout from history? This action cannot be undone."
                confirmButtonText='Delete'
                cancelButtonText='Cancel'
                onSubmit={() => deleteWorkout()}
            />
            <CreateEditWorkoutModal open={openEdit} onClose={() => handleClose()} title="Edit workout" />
        </Box>
    )
}

export default HistoryMenu