import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useDispatch } from 'react-redux';
import { openDeleteModal, openEditModal, closeModal } from '../../redux/reducers/modalReducer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


import ModalRoot from '../Modals/ModalRoot'

const OpenModalMenu = ({ exercise, showDateRange }) => {
    //console.log("rendergin paskakasa");
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const [showModal, setShowModal] = React.useState(false)
    const [modalType, setModalType] = React.useState('')

    const handleOpenMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    const handleMenuClick = (event, modalType) => {
        //event.stopPropagation()
        //console.log("menu click ", event.target)

        if (modalType === "deleteExercise") {
            setModalType('deleteExercise')
        } else if (modalType === "editExercise") {
            setModalType('editExercise')
        } else if (modalType === 'pickDateModal') {
            setModalType('pickDateModal')
        }

        setShowModal(true)
        handleClose()
    }

    return (
        <div>
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
                <MenuItem onClick={(event) => handleMenuClick(event, "editExercise")}>
                    <Stack direction="row" spacing={1}>
                        <EditIcon />
                        <div>Edit</div>
                    </Stack>
                </MenuItem>
                <MenuItem onClick={(event) => handleMenuClick(event, "deleteExercise")}>
                    <Stack direction="row" spacing={1}>
                        <DeleteForeverIcon />
                        <div>Delete</div>
                    </Stack>
                </MenuItem>
                {showDateRange &&
                    <MenuItem onClick={(event) => handleMenuClick(event, "pickDateModal")}>
                        <Stack direction="row" spacing={1}>
                            <CalendarMonthIcon />
                            <div>Range</div>
                        </Stack>
                    </MenuItem>
                }
            </Menu>
            <ModalRoot open={showModal} setOpen={setShowModal} openButtonText={"kaka"} title={"kaka"} modalType={modalType} exercise={exercise} />
        </div>
    );
}

export default OpenModalMenu