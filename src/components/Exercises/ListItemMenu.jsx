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

const ListItemMenu = ({ exercise }) => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    const handleMenuClick = (modalType) => {
        modalType === "delete" ?
            dispatch(openDeleteModal(exercise)) :
            dispatch(openEditModal(exercise))
        handleClose()
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
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
                <MenuItem onClick={() => handleMenuClick('edit')}>
                    <Stack direction="row" spacing={1}>
                        <EditIcon />
                        <div>Edit</div>
                    </Stack>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('delete')}>
                    <Stack direction="row" spacing={1}>
                        <DeleteForeverIcon />
                        <div>Delete</div>
                    </Stack>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ListItemMenu