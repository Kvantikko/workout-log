import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Box, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import BasicModal from '../Modals/BasicModal';

import { useDispatch } from 'react-redux';
import { openDeleteModal, openEditModal, closeModal } from '../../redux/reducers/modalReducer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ConfirmationModal from '../Modals/ConfirmationModal';
import { toast } from 'react-toastify';

import templateService from '../../services/templates'
import { removeExercise } from '../../redux/reducers/exerciseLibraryReducer';
import FormModal from '../Modals/FormModal';
import ModalRoot from '../Modals/ModalRoot'
import { useNavigate } from 'react-router-dom';

import { removeFromHistory } from '../../redux/reducers/historyReducer';
import { removeTemplate } from '../../redux/reducers/templateLibraryReducer';
import BasicMenu from './BasicMenu';

const TemplateMenu = ({ workout }) => {

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

    const deleteTemplate = async () => { // infinte request spam servulle jos deleteExercise ja removeExercise sama nimi
        try {
            const response = await templateService.remove(workout?.id)
            dispatch(removeTemplate(workout?.id))
            handleClose()
            toast.success("Template deleted!");
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleOpen={handleOpen}
                handleClose={() => handleClose()}
                openDelete={() => setOpenDelete(true)}
                openEdit={() => setOpenEdit(true)}
                object={workout}
            />
            <BasicModal
                open={openDelete}
                onClose={() => handleClose()}
                title="Delete template?"
                subTitle="Are you sure you want to delete this workout template? This action cannot be undone."
                confirmButtonText='Delete'
                cancelButtonText='Cancel'
                onSubmit={() => deleteTemplate()}
            />
        </>
    );
}

export default TemplateMenu