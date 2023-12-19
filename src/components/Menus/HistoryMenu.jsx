import * as React from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { clearWorkout } from '../../redux/reducers/workoutReducer'
import { setTemplate } from '../../redux/reducers/templateReducer'
import { removeWorkout } from '../../redux/reducers/historyReducer'

import { Box, ListItemButton, Stack, IconButton } from '@mui/material';

import CreateEditWorkoutModal from '../Modals/CreateEditWorkoutModal';
import BasicModal from '../Modals/BasicModal';
import BasicMenu from './BasicMenu';

import workoutService from '../../services/workouts'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const HistoryMenu = ({ workout }) => {
    console.log("Redndering HistoryMenu ", workout);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)


    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        dispatch(clearWorkout())
        setOpenDelete(false)
        setOpenEdit(false)
        setAnchorEl(null)
    }

    const deleteWorkout = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        try {
            const response = await workoutService.remove(workout?.id)
            dispatch(removeWorkout(workout?.id))
            handleClose()
            toast.success("Workout deleted!");
            navigate('/history')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const copy = () => {
        dispatch(setTemplate(workout))
    }

    const handleEdit = () => {
        copy()
        setOpenEdit(true)
    }

    return (
        <Box display="flex">
            {/* <IconButton
                id="basic-menu-button"
              
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenuClick}
            >
                <MoreVertIcon sx={{ padding: 0 }} />
            </IconButton>
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
            </Menu> */}
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleOpen={handleOpen}
                handleClose={() => handleClose()}
                openDelete={() => setOpenDelete(true)}
                openEdit={() => handleEdit()}
                object={workout}
            />
            <BasicModal
                open={openDelete}
                onClose={() => handleClose()}
                title="Delete workout?"
                subTitle="Are you sure you want to delete this workout from history? This action cannot be undone."
                confirmButtonText='Delete'
                cancelButtonText='Cancel'
                onSubmit={() => deleteWorkout()}
            />
            <CreateEditWorkoutModal
                open={openEdit}
                onClose={handleClose}
                title="Edit workout"
                disableWarning={true}
                workout={workout}
                editVipu={true}
                type="history"
            />
        </Box>
    )
}

export default HistoryMenu