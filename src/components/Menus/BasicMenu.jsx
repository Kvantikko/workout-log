import * as React from 'react'

import Menu from '@mui/material/Menu'
import { Box, ListItemButton, Stack, IconButton } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const BasicMenu = ({ open, anchorEl, handleOpen, handleClose, openDelete, openEdit, object }) => {

    /*  const [anchorEl, setAnchorEl] = React.useState(null)
     const open = Boolean(anchorEl);
 
 
     const handleOpenMenuClick = (event) => {
         setAnchorEl(event.currentTarget)
     }
 
     const handleClose = () => {
         setAnchorEl(null)
     } */

    return (
        <Box display="flex">
            <IconButton
                id="basic-menu-button"
                //aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleOpen(event)}
                //sx={{ minWidth: 0, padding: 0 }}
                //variant='secondary'
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
                <ListItemButton onClick={openEdit}>
                    <Stack direction="row" spacing={1}>
                        <EditIcon color='info' />
                        <div>Edit</div>
                    </Stack>
                </ListItemButton>
                <ListItemButton onClick={openDelete}>
                    <Stack direction={'row'} spacing={1}>
                        <DeleteForeverIcon color='error' />
                        <div>Delete</div>
                    </Stack>
                </ListItemButton>
            </Menu>
        </Box>
    )
}

export default BasicMenu