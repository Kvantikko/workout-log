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
import BasicMenu from './BasicMenu';
import BasicModal from '../Modals/BasicModal';

const ExercisesMenu = ({ exercise, showDateRange }) => {


    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setOpenDelete(false)
        setOpenEdit(false)
        setAnchorEl(null)
    }

    const deleteExercise = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
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
        <div>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleOpen={handleOpen}
                handleClose={() => handleClose()}
                openDelete={() => setOpenDelete(true)}
                openEdit={() => setOpenEdit(true)}
                object={exercise}
            />
            {openEdit &&
                <FormModal
                    onClick={() => {
                        console.log("clickity click");
                    }}
                    menuItem={true}
                    modalType='editExercise'
                    color='error'
                    openButton={
                        <Stack direction="row" spacing={1}>
                            <EditIcon color='info' />
                            <div>Edit</div>
                        </Stack>
                    }
                    confirmButton='Save'
                    confirmFunction={deleteExercise}
                    object={exercise}
                    handleMenuClose={handleClose}
                />
            }
            {openDelete &&
                <BasicModal
                    open={openDelete}
                    onClose={() => handleClose()}
                    title="Delete exercise?"
                    subTitle="Are you sure you want to remove this exercise and its history from the database?
                    This action cannot be undone"
                    confirmButtonText='Delete'
                    cancelButtonText='Cancel'
                    onSubmit={() => deleteExercise()}
                />
            }
        </div>
    );
}

export default ExercisesMenu