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


import ModalRoot from '../Modals/ModalRoot'

const OpenModalMenu = ({ exercise }) => {
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
         
        modalType === "deleteExercise" ?
            setModalType('deleteExercise') :
            setModalType('editExercise')
        
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
            >
                <MoreVertIcon />
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
            </Menu>
            <ModalRoot open={showModal} setOpen={setShowModal} openButtonText={"kaka"} title={"kaka"} modalType={modalType} exercise={exercise}/>
        </div>
    );
}

export default OpenModalMenu