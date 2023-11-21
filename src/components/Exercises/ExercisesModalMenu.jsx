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

const ExercisesModalMenu = ({ exercise, showDateRange }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //console.log("rendergin paskakasa");
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    //const [showModal, setShowModal] = React.useState(false)
    //const [modalType, setModalType] = React.useState('')

    const handleOpenMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        console.log("handling close");
        setAnchorEl(null)
    }

    const handleMenuClick = (event, modalType) => {
        //event.stopPropagation()
        //console.log("menu click ", event.target)

        /* if (modalType === "deleteExercise") {
            setModalType('deleteExercise')
        } else if (modalType === "editExercise") {
            setModalType('editExercise')
        } else if (modalType === 'pickDateModal') {
            setModalType('pickDateModal')
        } */

        // setShowModal(true)
        handleClose()
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
        <Box
            display="flex"
        //flexDirection="column"
        //justifyContent="center"
        //alignItems="center"
        //minHeight="75vh"
        //minWidth="75vh"
        //padding={4}
        //maxWidth="75vw"
        //sx={{ maxWidth: 600 }}
        //minHeight="75vh"
        >
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMenuClick}
                sx={{ minWidth: 50 }}
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
                {showDateRange &&
                    <FormModal
                        menuItem={true}
                        modalType='pickDateModal'
                        //color=''
                        openButton={
                            <Stack direction="row" spacing={1}>
                                <CalendarMonthIcon color='info' />
                                <div>Date</div>
                            </Stack>
                        }
                        //confirmButton='Delete forever'
                        //confirmFunction={deleteExercise}
                        handleMenuClose={handleClose}
                    //object={exercise}
                    />

                    /*   <MenuItem onClick={(event) => handleMenuClick(event, "pickDateModal")}>
                          <Stack direction="row" spacing={1}>
                              <CalendarMonthIcon />
                              <div>Range</div>
                          </Stack>
                      </MenuItem> */
                }
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
                {/* <MenuItem onClick={(event) => handleMenuClick(event, "editExercise")}>
                    <Stack direction="row" spacing={1}>
                        <EditIcon />
                        <div>Edit</div>
                    </Stack>
                </MenuItem> */}
                <ConfirmationModal
                    onClick={() => {
                        console.log("clickity click");
                    }}
                    menuItem={true}
                    modalType='deleteExercise'
                    color='error'
                    openButton={
                        <Stack direction={'row'} spacing={1}>
                            <DeleteForeverIcon color='error' />
                            <div>Delete</div>
                        </Stack>
                    }
                    confirmButton='Delete forever'
                    confirmFunction={deleteExercise}
                    handleMenuClose={handleClose}
                />
            </Menu>
        </Box>
    );
}

export default ExercisesModalMenu